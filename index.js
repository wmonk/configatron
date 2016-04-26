var assertType = function (thing, type, message) {
    if (thing != null && thing.constructor !== type) {
        throw new Error(message || key + ' must be of type ' + type);
    }
}
var assertProp = function (key, obj, message) {
    if (!(key in obj)) {
       throw new Error(message || key + ' is a required property'); 
    }
};
var defaultWebpackConfig = {
};

function configatron (conf) {
    var config = conf || {};
    assertProp('entry', config, 'You must provide an entry point for webpack');
    assertProp('output', config, 'You must provide an output object for webpack');
    assertType(config.output, Object, 'You must provide an output object for webpack');

    return conf;
}

module.exports = configatron;
