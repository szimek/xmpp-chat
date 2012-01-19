Chat.Views.ChatTab.Message = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '{{content.body}}'
    ),

    classNames: ['chat-message'],

    willInsertElement: function () {
        this.messageGroupCollectionView().onWillInsertMessageView();
    },

    didInsertElement: function () {
        this.messageGroupCollectionView().onDidInsertMessageView();
    },

    messageGroupCollectionView: function () {
        return this.getPath('collectionView.collectionView');
    }
});
