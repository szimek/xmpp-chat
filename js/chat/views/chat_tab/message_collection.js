Chat.Views.ChatTab.MessageCollection = Ember.CollectionView.extend({
    itemViewClass: Chat.Views.ChatTab.Message,
    contentBinding: 'parentView.content.messages',
    classNames: ['chat-messages']
});
