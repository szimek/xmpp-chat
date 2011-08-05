Chat.Views.ChatTabCollection = SC.CollectionView.extend({
    itemViewClass: Chat.Views.ChatTab.Layout,
    classNames: ['chat-tab-list', 'clearfix'],
    contentBinding: 'Chat.Controllers.chatTabs'
});
