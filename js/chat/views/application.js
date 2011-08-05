Chat.Views.Application = SC.ContainerView.extend({
    childViews: [
        Chat.Views.ChatTabCollection,
        Chat.Views.Roster.Layout
    ],
    classNames: ['chat-dock-wrapper', 'clearfix'],
    classNameBindings: ['Chat.Controllers.application.user.presence']
});
