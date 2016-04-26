var describe = require('tape');
var configatron = require('./index');
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

describe('Configatron', function (tape) {
    var it = tape.test;
    var defaultConf = { entry: '', output: {} };

    it('should return an object', assert => {
        assert.plan(1);
        var config = configatron(defaultConf);
        assert.equals(typeof config, 'object');
    });

    it('should throw if no entry is specified', assert => {
        assert.plan(1);
        assert.throws(() => configatron(), /entry/g);
    });

    it('should throw if no output is specified', assert => {
        assert.plan(1);
        assert.throws(() => configatron({ entry: '' }), /output/g);
    });

    it('should throw if output is not an object', assert => {
        assert.plan(1);
        assert.throws(() => configatron({ entry: '' }), /output/g);
    });
});

describe('Webpack Santiy Check', function (tape) {
    var it = tape.test;
    var defaultConf = { entry: path.join(__dirname, 'tmp', 'input.js'), output: { path: path.join(__dirname, 'tmp'), filename: 'output.js' } };

    it('should not error when passed to webpack', assert => {
        webpack(configatron(defaultConf), function (err, stats) {
            assert.equal(err, null);
            assert.equal(stats.hasErrors(), false, 'has no errors');
            assert.equal(stats.hasWarnings(), false, 'has no warnings');
            assert.end();
        });
    });
});
