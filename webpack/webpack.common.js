const Dotenv = require('dotenv-webpack');
const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';

module.exports = {
    entry: {
        popup: path.join(__dirname, srcDir + 'popup.ts'),
        background: path.join(__dirname, srcDir + 'background.ts'),
        content_script: path.join(__dirname, srcDir + 'content_script.ts'),
        microphone_access: path.join(__dirname, srcDir + 'microphone_access.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin({
            'patterns': [
                { from: '.', to: '../', context: 'public' }
            ]
        }),
        new Dotenv({
            path: './.env' // load this now instead of the ones in '.env'
        })
    ]
};
