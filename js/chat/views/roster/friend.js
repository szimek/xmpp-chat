Chat.Views.Roster.Friend = SC.View.extend({
    template: SC.Handlebars.compile(
        '</img>'
      + '{{content.name}}'
    ),
    tagName: 'a',
    classNames: ['chat-friend', 'clearfix'],
    attributeBindings: [
        'href',
        'data-chat-jid',
        'data-chat-presence',
        'data-chat-status',
        'data-chat-subscription'
    ],
    
    href: '#',
    'data-chat-jidBinding': 'content.jid',
    'data-chat-presenceBinding': 'content.presence',
    'data-chat-statusBinding': 'content.status',
    'data-chat-subscriptionBinding': 'content.subscription',

    // Event handlers
    click: function (event) {
        var friend = this.content;
        Chat.Controllers.chatTabs.activateTabFor(friend);
        return false;
    }
});
