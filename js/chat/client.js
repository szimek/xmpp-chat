// TODO:
// - bare/full JIDs
//   - send messages using full JID if available
//   - forget full JID on presence change (from online to offline-ish)
// - properly parse activity messages (?)
// - offline (delayed) messages (?)
// - automatic reconnecting... (?)
// - fetch user data (avatar, metadata) (?)

var IM = {};

// constructor
IM.Client = function (options) {
    this.host = options.host || '/http-bind';
    this.jid = options.jid;
    this.password = options.password;
    this.connection = new Strophe.Connection(this.host);
    this.jids = {};

    // TODO: move into a function
    // monitor all traffic in debug mode
    if (options.debug) {
        this.connection.xmlInput = function (xml) {
            console.log('Incoming:');
            console.log(xml);
        };
        this.connection.xmlOutput = function (xml) {
            console.log('Outgoing:');
            console.log(xml);
        };
    }
};

// private properties and methods
IM.Client.prototype._onConnect = function (status) {
    var Status = Strophe.Status;

    switch (status) {
    case Status.ERROR:
        $.publish('error.client.im');
        break;
    case Status.CONNECTING:
        $.publish('connecting.client.im');
        break;
    case Status.CONNFAIL:
        $.publish('connfail.client.im');
        break;
        case Status.AUTHENTICATING:
        $.publish('authenticating.client.im');
        break;
    case Status.AUTHFAIL:
        $.publish('authfail.client.im');
        break;
    case Status.CONNECTED:
        this._onConnected();
        $.publish('connected.client.im');
        break;
    case Status.DISCONNECTING:
        $.publish('diconnecting.client.im');
        break;
    case Status.DISCONNECTED:
        $.publish('diconnected.client.im');
        break;
    case Status.ATTACHED:
        $.publish('attached.client.im');
        break;
    }

    return true;
};

IM.Client.prototype._onConnected = function () {
    // get friend list
    this.getRoster(null, _.bind(this._onRoster, this));

    // monitor friend list changes
    this.connection.addHandler(_.bind(this._onRosterChange, this), Strophe.NS.ROSTER, 'iq', 'set');

    // monitor friends presence changes
    this.connection.addHandler(_.bind(this._onPresenceChange, this), null, 'presence');

    // monitor incoming chat messages
    this.connection.addHandler(_.bind(this._onMessage, this), null, 'message', 'chat');

    // notify others that we're online and request their presence status
    this.presence();
};

IM.Client.prototype._onPresenceChange = function (stanza) {
    stanza = $(stanza);

    // @show: possible values: XMPP native 'away', 'chat', 'dnd', 'xa' and 2 custom 'online' and 'offline'
    // @status: human-readable string e.g. 'on vacation'

    var fullJid = stanza.attr('from'),
        bareJid = Strophe.getBareJidFromJid(fullJid),
        show = stanza.attr('type') === 'unavailable' ? 'offline' : 'online',
        message = {
            from: fullJid,
            type: stanza.attr('type') || 'available',
            show: stanza.find('show').text() || show,
            status: stanza.find('status').text()
        };

    // Reset addressing
    // if online
    this.jids[bareJid] = fullJid;
    // else
    // this.jids[bareJid] = bareJid;

    $.publish('presence.client.im', message);
    return true;
};

IM.Client.prototype._onMessage = function (stanza) {
    stanza = $(stanza);

    var fullJid = stanza.attr('from'),
        bareJid = Strophe.getBareJidFromJid(fullJid),
        body = stanza.find('body').text(),
        // TODO: fetch activity
        activity = 'active',
        message = {
            id: stanza.attr('id'),
            from: fullJid,
            body: body,
            activity: activity
        };

    // Reset addressing
    this.jids[bareJid] = fullJid;

    $.publish('message.client.im', message);
    return true;
};

IM.Client.prototype._onRoster = function (stanza) {
    var message = this._handleRosterStanza(stanza);

    // Wrap message array again into an array,
    // otherwise jQuery will split it into separate arguments
    // when passed to 'bind' function
    $.publish('roster.client.im', [message]);
    return true;
};

IM.Client.prototype._onRosterChange = function (stanza) {
    var message = this._handleRosterStanza(stanza);

    $.publish('rosterChange.client.im', [message]);
    return true;
};

IM.Client.prototype._handleRosterStanza = function (stanza) {
    var self = this,
        items = $(stanza).find('item');

    return items.map(function (index, item) {
        item = $(item);

        var fullJid = item.attr('jid'),
            bareJid = Strophe.getBareJidFromJid(fullJid);

        // Setup addressing
        self.jids[bareJid] = fullJid;

        return {
            jid: fullJid,
            subscription: item.attr('subscription')
        };
    }).get();
};


// public properties and methods
IM.Client.prototype.connect = function () {
    this.connection.connect(this.jid, this.password, _.bind(this._onConnect, this));
    return this;
};

IM.Client.prototype.disconnect = function () {
    this.connection.flush();
    this.connection.disconnect();
    $.publish('disconnected.client.im');
};

IM.Client.prototype.send = function (stanza) {
    this.connection.send(stanza);
};

IM.Client.prototype.iq = function (stanza, error, success) {
    this.connection.sendIQ(stanza, success, error);
};

IM.Client.prototype.presence = function (status) {
    var stanza = $pres();
    if (status) {
        stanza.attrs({type: status});
    }
    this.send(stanza);
};

IM.Client.prototype.message = function (to, message) {
    var fullJid = this.jids[to],
        stanza = $msg({
            to: fullJid,
            type: 'chat'
        }).c('body').t(message);
    this.send(stanza);
};

IM.Client.prototype.getRoster = function (error, success) {
    var stanza = $iq({type: 'get'}).c('query', {xmlns: Strophe.NS.ROSTER});
    this.iq(stanza, error, success);
};
