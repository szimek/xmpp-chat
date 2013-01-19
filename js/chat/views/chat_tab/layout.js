Chat.Views.ChatTab.Layout = Ember.ContainerView.extend({
    childViews: [
        Chat.Views.ChatTab.Button,
        Chat.Views.ChatTab.Flyout
    ],
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
    'data-chat-statusBinding': 'content.friend.status'
});
