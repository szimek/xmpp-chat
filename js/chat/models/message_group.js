Chat.Models.MessageGroup = Ember.Object.extend({
    from: null,

    init: function () {
        this.set('messages', []);
    }
});
