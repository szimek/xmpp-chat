Chat.Models.User = Ember.Object.extend({
    // Default attribute values
    jid: null,
    subscription: 'none',
    resources: null, // Set of opened connections

    init: function () {
        // We have to initialize 'resources' inside init function,
        // because otherwise all User objects would use the same Set object
        this.set('resources', []);
    },

    name: function () {
        var jid = this.get('jid');
        return jid ? Strophe.getNodeFromJid(jid) : jid;
    }.property('jid').cacheable(),

    presence: function () {
        return this.get('resources').length ? 'available' : 'unavailable';
    }.property('resources.length').cacheable(),

    status: function () {
        // TODO: fetch the most recently used resource
        var resource = this.get('resources')[0];
        return resource ? resource.get('show') : 'offline';
    }.property('resources.@each.show').cacheable(),

    setPresence: function (presence) {
        var resources = this.get('resources'),
            id = Strophe.getResourceFromJid(presence.from),
            resource = resources.findProperty('id', id);

        if (presence.type === 'unavailable' && resource) {
            resources.removeObject(resource);
        } else {
            if (resource) {
                // TODO: set both properties at once?
                resource.set('show', presence.show);
                resource.set('status', presence.status);
            } else {
                resource = Chat.Models.Resource.create({
                    id: id,
                    show: presence.show,
                    status: presence.status
                });
                resources.addObject(resource);
            }
        }

        return resource;
    }
});
