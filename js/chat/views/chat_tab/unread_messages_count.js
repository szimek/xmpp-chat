Chat.Views.ChatTab.UnreadMessagesCount = SC.View.extend({
    template: SC.Handlebars.compile(
        '{{parentView.parentView.content.unreadMessagesCount}}'
    ),
    tagName: 'span',
    classNames: ['chat-tab-unread-messages'],
    classNameBindings: ['hidden'],

    hidden: function () {
        return this.getPath('parentView.parentView.content.unreadMessagesCount') === 0;
    }.property('parentView.parentView.content.unreadMessagesCount').cacheable()
});
