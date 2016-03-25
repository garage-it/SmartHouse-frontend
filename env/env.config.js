var path = require('path');
var rootDir = path.resolve(__dirname, '..');

module.exports = {
    root: {
        dir: rootDir,
        nodeModulesDir: path.join(rootDir, 'node_modules')
    },
    src: {
        dir: path.join(rootDir, 'src'),
        entry: path.join(rootDir, 'src', 'index.ts'),
        htmlEntry: path.join(rootDir, 'src', 'index.html')
    },
    tests: {
        entry: path.join(rootDir, 'env', 'karma.start.js')
    },
    dist: {
        dir: path.join(rootDir, 'dist')
    }
};
