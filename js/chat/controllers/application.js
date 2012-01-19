Chat.Controllers.application = Ember.Object.create({
    debug: false,

    connect: function (options) {
        // TODO: raise an error if jid and password are not present
        options = options || {};

        this.debug = options.debug || this.debug;
        this.user = Chat.Models.User.create({
            jid: options.jid,
            password: options.password
        });

        // Bindings for XMPP client events
        $.subscribe('roster.client.im', _.bind(this._onRoster, this));
        $.subscribe('rosterChange.client.im', _.bind(this._onRosterChange, this));
        $.subscribe('presence.client.im', _.bind(this._onPresenceChange, this));
        $.subscribe('message.client.im', _.bind(this._onMessage, this));

        // XMPP client
        this.client = new IM.Client({
            jid: this.user.get('jid'),
            password: this.user.get('password'),
            debug: this.debug
        });

        this.client.connect();
    },

    disconnect: function () {
        this.client.disconnect();
    },

    setUserPresence: function (presence) {
        this.user.setPresence(presence);
    },

    _onRoster: function (event, friends) {
        var objects = _.map(friends, function (friend) {
            return Chat.Models.User.create(friend);
        });

        Chat.Controllers.roster.set('content', objects);
    },

    _onRosterChange: function (event, friends) {
        friends.forEach(function (friend) {
            var roster = Chat.Controllers.roster,
                model = roster.findProperty('jid', friend.jid);

            if (friend.subscription === 'remove') {
                // Remove user from the roster
                // TODO: remove chat tab if present
                roster.removeObject(friend);

            } else {
                if (model) {
                    // Update user in the roster
                    // TODO: figure out Ember.Object#set for multiple properties
                    model.beginPropertyChanges();
                    Ember.keys(friend).forEach(function (key) {
                        model.set(key, friend[key]);
                    });
                    model.endPropertyChanges();
                } else {
                    // Add user to the roster
                    model = Chat.Models.User.create(friend);
                    roster.addObject(model);
                }
            }
        });
    },

    _onPresenceChange: function (event, presence) {
        var fullJid = presence.from,
            bareJid = Strophe.getBareJidFromJid(fullJid);

        switch (presence.type) {
        case 'error':
            // do something
            break;
        case 'subscribe':
            // authorization request
            break;
        case 'unsubscribe':
            // deauthorization request
            break;
        case 'subscribed':
            // authorization confirmed
            break;
        case 'unsubscribed':
            // deauthorization confirmed
            break;
        default:
            // Update user's or friend's presence status
            if (this.user.get('jid') === bareJid) {
                this.setUserPresence(presence);
            } else {
                Chat.Controllers.roster.setFriendPresence(presence);
            }
        }
    },

    _onMessage: function (event, message) {
        Chat.Controllers.chatTabs._onMessage(message);
    },

    sendMessage: function (message) {
        this.client.message(message.get('to'), message.get('body'));
    }
});
