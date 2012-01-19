Chat.Views.ChatTabCollection = Ember.CollectionView.extend({
    itemViewClass: Chat.Views.ChatTab.Layout,
    classNames: ['chat-tab-list', 'clearfix'],
    contentBinding: 'Chat.Controllers.chatTabs'
});
