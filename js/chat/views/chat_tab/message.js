Chat.Views.ChatTab.Message = SC.View.extend({
    template: SC.Handlebars.compile(
        '{{content.body}}'
    ),

    classNames: ['chat-message'],

    willInsertElement: function () {
        var messageGroupCollectionView = this.parentView.parentView.parentView;
        messageGroupCollectionView.onWillInsertMessageView();
    },

    didInsertElement: function () {
        var messageGroupCollectionView = this.parentView.parentView.parentView;
        messageGroupCollectionView.onDidInsertMessageView();
    }
});
