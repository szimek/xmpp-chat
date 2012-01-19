Chat.Views.Roster.Flyout = Ember.View.extend({
    template: Ember.Handlebars.compile(
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
