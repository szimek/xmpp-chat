Chat.Models.ChatTab = Ember.Object.extend({
    user: null,
    isActive: false,
    unreadMessagesCount: '0',

    init: function () {
        this.set('messageGroups', []);
    },

    _onMessage: function (message) {
        // TODO: handle activity messages as well
        if (message.get('body')) {
            // Group consecutive messages from the same user
            var groups = this.get('messageGroups'),
                group = groups.get('lastObject'),
                fullJid = message.get('from'),
                bareJid = Strophe.getBareJidFromJid(fullJid),
                from;

            if (this.shouldCreateNewGroup(group, bareJid)) {
                group = Chat.Models.MessageGroup.create({
                    from: bareJid
                });
                groups.addObject(group);
            }

            group.get('messages').addObject(message);

            if (!this.get('isActive')) {
                this.set('unreadMessagesCount', this.get('unreadMessagesCount') + 1);
            }
        }
    },

    resetUnreadMessagesCount: function () {
        if (this.get('isActive')) {
            this.set('unreadMessagesCount', 0);
        }
    }.observes('isActive'),

    shouldCreateNewGroup: function (group, sender) {
        return !group ||
            // last group is from other user than the new message
            (group && group.get('from') !== sender) ||
            // last message was created more than 5 minutes ago
            (group && (Date.now() - group.getPath('messages.lastObject.createdAt').valueOf() > 5*60*1000));
    }
});
