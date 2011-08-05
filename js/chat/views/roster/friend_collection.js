Chat.Views.Roster.FriendCollection = SC.CollectionView.extend({
    itemViewClass: Chat.Views.Roster.Friend,
    classNames: ['chat-flyout-body', 'chat-friend-list'],
    contentBinding: 'Chat.Controllers.roster.online'
});
