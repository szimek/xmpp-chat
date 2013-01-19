Chat.Views.ChatTab.UnreadMessagesCount = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '{{view.unreadMessagesCount}}'
    ),
    tagName: 'span',
    classNames: ['chat-tab-unread-messages'],

    // Order of bindings is important here.
    // See https://github.com/emberjs/ember.js/issues/1164
    unreadMessagesCountBinding: 'parentView.parentView.content.unreadMessagesCount',
    isVisibleBinding: 'areUnreadMessagesPresent',

    areUnreadMessagesPresent: function () {
        return this.get('unreadMessagesCount') !== 0;
    }.property('unreadMessagesCount')
});
