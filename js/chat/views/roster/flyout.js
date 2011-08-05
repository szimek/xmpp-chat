Chat.Views.Roster.Flyout = SC.View.extend({
    template: SC.Handlebars.compile(
        '<div class="chat-flyout-titlebar clearfix">'
      +   '<div class="titlebar-text-wrapper">'
      +     '<div class="titlebar-text">Chat</div>'
      +   '</div>'
      + '</div>'
      + '{{collection Chat.Views.Roster.FriendCollection}}'
    ),

    classNames: ['chat-flyout'],
    isVisibleBinding: 'parentView.isActive'
});
