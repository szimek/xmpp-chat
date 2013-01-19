Chat.Views.Roster.Button = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '<div class="chat-button-rule">'
      +   '<div class="image-block clearfix">'
      +     '<img class="image-block-image icon" src="/images/empty.gif" width="1" height="1"/>'
      +     '<div class="image-block-content chat-button-content clearfix">'
      +       '<span class="label">Chat <span>(<strong class="count">{{view.onlineFriendCount}}</strong>)</span></span>'
      +     '</div>'
      +   '</div>'
      + '</div>'
    ),

    tagName: 'a',
    classNames: ['chat-button'],
    href: '#',
    rel: 'toggle',

    // TODO: use state chart for this?
    onlineFriendCount: function () {
        var count = Chat.Controllers.roster.get('online.length'),
            presence = Chat.Controllers.application.get('user.presence');

        return presence === 'unavailable' ? 'Offline' : count;
    }.property('Chat.Controllers.roster.online.length', 'Chat.Controllers.application.user.presence'),

    click: function (event) {
        var parentView = this.get('parentView');
        parentView.set('isActive', !parentView.get('isActive'));
        return false;
    }
});
