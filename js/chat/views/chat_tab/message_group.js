Chat.Views.ChatTab.MessageGroup = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '<a class="left" href="#" >'
      +   '<img class="profile-photo" src="/images/chat/fb_avatar.png" {{bindAttr title="from"}} />'
      + '</a>'
      + '<div class="chat-message-group-metainfo">{{timestamp}}</div>'
      + '{{collection Chat.Views.ChatTab.MessageCollection}}'
    ),
    classNames: ['chat-message-group clearfix'],
    attributeBindings: ['data-chat-message-from'],
    'data-chat-message-fromBinding': 'content.from',

    from: function () {
        var from = this.getPath('content.from'),
            you  = this.getPath('Chat.Controllers.application.user.jid');
        return from === you ? 'You' : from;
    }.property('content.from').cacheable(),

    timestamp: function () {
        function pad(n) { return n < 10 ? '0' + n : n; }
        var createdAt = this.getPath('content.messages.firstObject.createdAt');
        return pad(createdAt.getHours()) + ':' + pad(createdAt.getMinutes());
    }.property().cacheable()
});
