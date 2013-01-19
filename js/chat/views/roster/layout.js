Chat.Views.Roster.Layout = Ember.ContainerView.extend({
    childViews: [
        Chat.Views.Roster.Button,
        Chat.Views.Roster.Flyout
    ],
    classNames: ['roster', 'chat-tab'],
    classNameBindings: ['isActive'],

    isActive: false
});
