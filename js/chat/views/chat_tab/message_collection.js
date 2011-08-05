Chat.Views.ChatTab.MessageCollection = SC.CollectionView.extend({
    itemViewClass: Chat.Views.ChatTab.Message,
    contentBinding: 'parentView.content.messages',
    classNames: ['chat-messages']
});
