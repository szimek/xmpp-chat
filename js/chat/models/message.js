Chat.Models.Message = SC.Object.extend({
    from: null,
    to: null,
    body: null,
    createdAt: null,

    init: function () {
        this.set('createdAt', new Date());
    }
});
