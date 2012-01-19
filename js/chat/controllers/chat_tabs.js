Chat.Controllers.chatTabs = Ember.ArrayProxy.create({
    content: [],

    activateTabFor: function (friend) {
        var tab = this.content.find(function (item) {
            return item.getPath('friend.jid') === friend.get('jid');
        });

        if (!tab) {
            tab = this.createTab(friend);
            this.addTab(tab);
        }

        this.activateTab(tab);
    },

    activateTab: function (tab) {
        this.content.without(tab).setEach('isActive', false);
        tab.set('isActive', true);
    },

    deactivateTab: function (tab) {
        tab.set('isActive', false);
    },

    toggleTabActiveState: function (tab) {
        if (tab.get('isActive')) {
            this.deactivateTab(tab);
        } else {
            this.activateTab(tab);
        }
    },

    createTab: function (friend) {
        return Chat.Models.ChatTab.create({
            user: Chat.Controllers.application.user,
            friend: friend
        });
    },

    addTab: function (tab) {
        this.content.unshiftObject(tab);
    },

    removeTab: function (tab) {
        this.content.removeObject(tab);
    },

    // Handle incoming messages
    _onMessage: function (message) {
        var fullJid = message.from,
            bareJid = Strophe.getBareJidFromJid(fullJid),
            friend = Chat.Controllers.roster.findProperty('jid', bareJid),
            tab;

        // Skip if we got a message from someone not in our roster
        if (friend) {
            message.fromName = friend.get('name');
            message.direction = 'incoming';

            tab = this.find(function (tab) {
                return tab.getPath('friend.jid') === friend.get('jid');
            });

            // Create a new tab if there isn't one already,
            // but only for non-activity messages
            if (!tab && message.body) {
                tab = this.createTab(friend);
                this.addTab(tab);

                // Activate the new tab if there are no other active tabs
                if (!this.someProperty('isActive')) {
                    this.activateTab(tab);
                }
            }

            if (tab) {
                tab._onMessage(Chat.Models.Message.create(message));
            }
        }
    }
});
