const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'iApi',
        libraryTarget: 'umd',
    },
    mode: 'development',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-object-rest-spread'],
                },
            },
        ],
    },
    stats: {
        colors: true,
    },
};