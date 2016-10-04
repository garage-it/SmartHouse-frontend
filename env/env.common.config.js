const path = require('path');
const rootDir = path.resolve(__dirname, '..');

function rootPath() {
    return path.join.apply(path, [rootDir].concat([].slice.apply(arguments)));
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
            main: rootPath('src', 'main.browser.ts'),
            vendor: rootPath('src', 'vendor.browser.ts'),
            polyfills: rootPath('src', 'polyfills.browser.ts')
        },
        indexHtml: rootPath('src', 'index.html')
    },
    tests: {
        dir: rootPath('test'),
        entry: rootPath('test', 'index.ts')
    },
    dist: {
        dir: rootPath('dist')
    }
};
