Chat.Views.Roster.Layout = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '<a href="#" rel="toggle" class="chat-button">'
      +   '<div class="chat-button-rule">'
      +     '<div class="image-block clearfix">'
      +       '<img class="image-block-image icon" src="/images/empty.gif" width="1" height="1"/>'
      +       '<div class="image-block-content chat-button-content clearfix">'
      +         '<span class="label">Chat <span>(<strong class="count">{{onlineFriendCount}}</strong>)</span></span>'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      + '</a>'
      + '{{view Chat.Views.Roster.Flyout}}'
    ),
    classNames: ['roster', 'chat-tab'],
    classNameBindings: ['isActive'],

    isActive: false,

    // TODO: use state chart for this?
    onlineFriendCount: function () {
        var count = this.getPath('Chat.Controllers.roster.online.length'),
            presence = this.getPath('Chat.Controllers.application.user.presence');

        return presence === 'unavailable' ? 'Offline' : count;
    }.property('Chat.Controllers.roster.online.length', 'Chat.Controllers.application.user.presence').cacheable(),

    // TODO: split it into 2 views - button and flyout and just use 'click' on button
    didInsertElement: function () {
        this.$('.chat-button').click(_.bind(function (event) {
            this.set('isActive', !this.get('isActive'));
            return false;
        }, this));
    }
});
