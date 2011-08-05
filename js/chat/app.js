var Chat = window.Chat = SC.Application.create({
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
