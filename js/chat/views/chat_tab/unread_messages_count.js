Chat.Views.ChatTab.UnreadMessagesCount = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '{{unreadMessagesCount}}'
    ),
    tagName: 'span',
    classNames: ['chat-tab-unread-messages'],
    isVisibleBinding: 'areUnreadMessagesPresent',

    unreadMessagesCountBinding: 'parentView.parentView.content.unreadMessagesCount',
    areUnreadMessagesPresent: function () {
        return this.get('unreadMessagesCount') !== 0;
    }.property('unreadMessagesCount').cacheable()
});
