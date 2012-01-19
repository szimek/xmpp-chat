Chat.Views.ChatTab.Layout = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '{{view Chat.Views.ChatTab.Button}}'
      + '{{view Chat.Views.ChatTab.Flyout}}'
    ),
    classNames: ['chat-tab clearfix'],
    classNameBindings: ['isActive'],
    attributeBindings: [
        'data-chat-with',
        'data-chat-presence',
        'data-chat-status'
    ],

    isActiveBinding: 'content.isActive',
    'data-chat-withBinding': 'content.friend.jid',
    'data-chat-presenceBinding': 'content.friend.presence',
    'data-chat-statusBinding': 'content.friend.status',

    // TODO: split it into 2 views - button and flyout and just use 'click' on button
    didInsertElement: function () {
        // Close tab
        this.$('.chat-button .chat-button-action.close').click(_.bind(function (event) {
            Chat.Controllers.chatTabs.removeTab(this.content);
            return false;
        }, this));

        // Activate/deactivate tab
        this.$('.chat-button').click(_.bind(function (event) {
            Chat.Controllers.chatTabs.toggleTabActiveState(this.content);
            return false;
        }, this));
    }
});
