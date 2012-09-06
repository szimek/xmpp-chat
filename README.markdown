## Introduction
This is a Facebook chat clone written using [Strophe.js](http://strophe.im/strophejs/) and [Ember.js](https://github.com/emberjs/ember.js). You can see a short screencast [here](http://www.screencast.com/users/szimek/folders/Jing/media/73bd5135-d758-42ef-a418-20ad78d2a750).

## Installation
First of all you'll need a XMPP server e.g. [ejabberd](http://ejabberd.im) that can be easily installed using homebrew or apt-get. The widget does not handle user registration or subscriptions - these features will most likely be managed by your web application. If you want to try it out you'll have to create XMPP accounts and subscriptions between them yourself. The easiest way to do it is to use any IM chat client or via command line interface of your XMPP server (`ejabberdctl`if you're using ejabberd).

The widget runs on a web server written in [Node](http://nodejs.org) that acts also as reverse proxy for XMPP server. It requires `express` and `http-proxy` packages. Run `node server.js` and it will start the server on `localhost:9677`. Sign in with any of the accounts you've created earlier and you should be good to go.

## License
This software is released under the MIT license:

www.opensource.org/licenses/MIT
