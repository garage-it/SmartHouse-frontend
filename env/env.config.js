var path = require('path');
var rootDir = path.resolve(__dirname, '..');

function rootPath(relativePath) {
    var args = [].slice.call(arguments, 0);
    return path.join.apply(path, [rootDir].concat(args));
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
        entry: rootPath('src', 'index.ts'),
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
