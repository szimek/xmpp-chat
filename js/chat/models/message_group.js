Chat.Models.MessageGroup = SC.Object.extend({
    from: null,

    init: function () {
        this.set('messages', []);
    }
});
