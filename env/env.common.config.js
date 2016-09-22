const path = require('path');
const rootDir = path.resolve(__dirname, '..');

function rootPath(...args) {
    return path.join(rootDir, ...args);
}

module.exports = {
    path: rootPath,
    staticServer: {
        host: 'localhost',
        port: 8000
    },
    mockServer: {
        host: 'localhost',
        port: 9000
    },
    public: {},
    root: {
        dir: rootDir
    },
    nodeModules: {
        dir: rootPath('node_modules')
    },
    env: {
        dir: rootPath('env')
    },
    src: {
        dir: rootPath('src'),
        entry: {
            polyfills: rootPath('src', 'polyfills.browser.js'),
            vendor: rootPath('src', 'vendor.browser.js'),
            main: rootPath('src', 'main.browser.js')
        },
        indexHtml: rootPath('src', 'index.html')
    },
    tests: {
        dir: rootPath('test'),
        entry: rootPath('test', 'index.js')
    },
    dist: {
        dir: rootPath('dist')
    }
};
