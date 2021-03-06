const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [ 'ts-loader' ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    externals: [ nodeExternals() ],
    watch: NODE_ENV === 'development',
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['yarn run:dev']
        })
    ]
};