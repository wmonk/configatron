var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
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
var defaultWebpackConfig = {};
var cssLoader = {
    test: /\.css$/,
    loaders: ['style', 'css', 'postcss']
};
var jsLoader = {
    test: /\.js$/,
    loader: 'babel',
    query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
    }
};
var jsonLoader = {
    test: /\.json$/,
    loader: 'json'
}

function configatron (conf) {
    var config = conf || {};
    assertProp('entry', config, 'You must provide an entry point for webpack');
    assertProp('output', config, 'You must provide an output object for webpack');
    assertType(config.output, Object, 'You must provide an output object for webpack');

    return Object.assign({}, conf, {
        module: {
            loaders: [cssLoader, jsLoader, jsonLoader]
        },
        postcss: function () { return [autoprefixer, nested] }
    });
}

module.exports = configatron;
