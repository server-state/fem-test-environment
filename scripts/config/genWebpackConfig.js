const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/**
 * Generate a new cbm test environment webpack compiler configuration.
 * @param paths the path object generated from ./genPaths.js
 * @returns {{mode: string, output: {path: string, filename: string, publicPath: string}, entry: {main: *},
 *            resolve: {extensions: [string, string]}, plugins: [*, *, *],
 *            module: {rules: [{test: RegExp, use: {loader: string, options:
 *                {presets: [[string, {modules: boolean}], string], cacheDirectory: boolean}},
 *              exclude: RegExp}, {test: RegExp, use: {loader: string, options: {limit: number, name: string}}}]}
 *          }} the webpack compiler configuration
 */
module.exports = function(paths) {
    // noinspection SpellCheckingInspection
    return {
        mode: 'development',
        entry: {
            main: paths.testEnvSrcIndex
        },
        output: {
            filename: 'bundle.js',
            path: paths.cbmDist,
            publicPath: '/'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                cbmSrcIndex: path.resolve(paths.cbmSrcIndex),
                cbmSrcSamples: path.resolve(paths.cbmSrcSamples)
            },
            modules: [path.resolve(paths.cbmRoot, 'node_modules'), 'node_modules']
        },
        module: {
            rules: [
                {
                    // loader for jsx syntax
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {modules: false}],
                                '@babel/preset-react'
                            ],
                            cacheDirectory: true
                        }
                    }
                },
                {
                    // for image files in public folder
                    test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: `[name].[hash].[ext]`
                        }
                    }
                }
            ]
        },
        devtool: 'source-map',
        plugins: [
            // generates a valid html index file for development server
            new HTMLWebpackPlugin({
                template: paths.testEnvPublicHTML,
                filename: 'index.html'
                //inject: 'body'
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    }
};