Chat.Controllers.roster = Ember.ArrayProxy.create({
    content: [],

    online: function () {
        return this.filterProperty('presence', 'available');
    }.property('@each.presence').cacheable(),

    setFriendPresence: function (presence) {
        var fullJid = presence.from,
            bareJid = Strophe.getBareJidFromJid(fullJid),
            friend = this.findProperty('jid', bareJid);

        if (friend) {
            friend.setPresence(presence);
        } else {
            // Something went wrong. 
            // Got presence notification from user not in the roster.
            console.warn('Presence update from user not in the roster: ' + fullJid + ':' + presence.type);
        }
    }
});
