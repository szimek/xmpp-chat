var Chat = window.Chat = Ember.Application.create({
    connect: function (options) {
        Chat.Controllers.application.connect(options);
    },

    disconnect: function () {
        Chat.Controllers.application.disconnect();
    }
});

Chat.Models = {};
Chat.Controllers = {};
Chat.Views = {
    Roster: {},
    ChatTab: {}
};
