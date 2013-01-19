Chat.Views.ChatTab.Message = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '{{view.content.body}}'
    ),

    classNames: ['chat-message'],

    willInsertElement: function () {
        this.messageGroupCollectionView().onWillInsertMessageView();
    },

    didInsertElement: function () {
        this.messageGroupCollectionView().onDidInsertMessageView();
    },

    messageGroupCollectionView: function () {
        return this.get('parentView.parentView.parentView');
    }
});
