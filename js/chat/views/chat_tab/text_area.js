Chat.Views.ChatTab.TextArea = Ember.TextArea.extend({
    classNames: ['autogrow'],

    didInsertElement: function () {
        this.$().autogrow();
        this.focus();
    },

    keyDown: function (event) {
        // Send message when Enter key is pressed
        if (event.which === 13) {
            event.preventDefault();

            var tab = this.getPath('parentView.parentView.content'),
                body = this.get('value'),
                user = tab.get('user'),
                friend = tab.get('friend'),
                message = Chat.Models.Message.create({
                    from: user.get('jid'),
                    to: friend.get('jid'),
                    body: body,
                    fromName: user.get('name'),
                    direction: 'outgoing'
                });

            this.set('value', '');

            // Send message to XMPP server
            Chat.Controllers.application.sendMessage(message);

            // Display the message to the sender,
            // because it won't be sent back by XMPP server
            tab._onMessage(message);
        }
    },

    focus: function () {
        if (this.getPath('parentView.isVisible')) {
            // This observer is called before the observer of the parent view
            // that toggles its visiblity, so we have to wait a bit
            window.setTimeout(_.bind(function () {
                this.$().focus();
            }, this), 0);
        }
    }.observes('parentView.isVisible')
});
