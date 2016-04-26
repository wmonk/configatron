var path = require('path');
var configatron = require('./index');
module.exports = configatron({ 
    entry: './fixtures/input',
    output: {
        path: path.join(__dirname, 'tmp'), 
        filename: 'output.js' 
    }
});
