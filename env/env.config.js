const path = require('path');
const rootDir = path.resolve(__dirname, '..');

function rootPath(...args) {
    return path.join(rootDir, ...args);
}

module.exports = {
    path: rootPath,

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
        entry: rootPath('src', 'index.js'),
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
