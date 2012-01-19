Chat.Views.ChatTab.Button = Ember.View.extend({
    template: Ember.Handlebars.compile(
        '<div class="chat-button-content clearfix">'
      +   '<div class="chat-button-options right clearfix">'
      +     '<label class="chat-button-action close"><input type="button"></label>'
      +   '</div>'
      +   '<div class="wrapper">'
      +     '<div class="wrap"><div class="name">{{parentView.content.friend.name}}</div></div>'
      +     '{{view Chat.Views.ChatTab.UnreadMessagesCount}}'
      +   '</div>'
      + '</div>'
    ),

    tagName: 'a',
    classNames: ['chat-button'],
    attributeBindings: [
        'href', 'rel'
    ],

    href: '#',
    rel: 'toggle',

    isVisibleBinding: 'isActive',

    isActive: function () {
        return !this.getPath('parentView.content.isActive');
    }.property('parentView.content.isActive').cacheable()
});
