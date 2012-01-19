Chat.Views.ChatTab.Flyout = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '<div class="chat-flyout-titlebar clearfix">'
      +   '<div class="titlebar-text-wrapper">'
      +     '<span class="titlebar-text">{{parentView.content.friend.name}}</span>'
      +   '</div>'
      +   '<div class="chat-button-options right"></div>'
      + '</div>'
      + '<div class="chat-flyout-body">'
      +   '{{collection Chat.Views.ChatTab.MessageGroupCollection}}'
      + '</div>'
      + '<div class="chat-flyout-footer input-container">'
      +   '{{view Chat.Views.ChatTab.TextArea}}'
      +   '<span class="input-icon"></span>'
      + '</div>'
    ),

    classNames: ['chat-flyout'],
    isVisibleBinding: 'parentView.content.isActive',

    didInsertElement: function () {
        this.$('.chat-flyout-body').click(_.bind(function (event) {
            this.$('textarea').focus();
        }, this));

        this.$('.chat-flyout-titlebar').click(_.bind(function (event) {
            var tab = this.getPath('parentView.content');
            Chat.Controllers.chatTabs.toggleTabActiveState(tab);
            return false;
        }, this));
    }
});
