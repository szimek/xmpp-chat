Chat.Views.ChatTab.MessageGroupCollection = Ember.CollectionView.extend({
    itemViewClass: Chat.Views.ChatTab.MessageGroup,
    classNames: ['message-list'],
    contentBinding: 'parentView.parentView.content.messageGroups',

    onWillInsertMessageView: function () {
        this.doScrollFlyoutView = this.isNearBottom();
    },

    onDidInsertMessageView: function () {
        if (this.doScrollFlyoutView) {
            this.scrollFlyoutView();
        }
    },

    isNearBottom: function (threshold) {
        var container = this.$().parent('.chat-flyout-body');
        threshold = threshold || 10;
        return (container.prop("scrollTop") + container.prop("offsetHeight") + threshold) >= container.prop("scrollHeight");
    },

    scrollFlyoutView: function () {
        var container = this.$().parent('.chat-flyout-body');
        container.prop('scrollTop', container.prop('scrollHeight'));
    }
});
