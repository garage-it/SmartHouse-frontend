const path = require('path');
const Promise = require('bluebird');
const fs = require('fs');

module.exports = function(config) {
    return function(context) {
        const plugin = {};
        Object.assign(plugin, {
            name: 'smart-house-frontend',
            init: _init.bind(plugin, config, context),
            start: function() { },
            stop: function() { },
            destroy: function() { },
        });
        return plugin;
    };
};

function _init(config, context) {
    // Distribution directory
    const DIST_DIR = path.resolve(__dirname + '/../dist') || config.PATH_FRONTENT_DIST;

    // index html file
    const indexfile = DIST_DIR + '\\index.html'

    // Check If index.html file exists in dist folder
    return new Promise(function(resolve, reject) {
        fs.stat(indexfile, function(err, stat) {

            if (err) {
                reject('File does not exist: ' + indexfile);
                return;
            }
            // Mount serve static path
            context.setStaticFilesPath(DIST_DIR);
            resolve();
        });
    });
}
