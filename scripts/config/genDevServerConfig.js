/**
 * Generate a new cbm test environment webpack development server configuration.
 * @param paths the path object generated from ./genPaths.js
 * @returns {{overlay: boolean, stats: string, compress: boolean, clientLogLevel: string,
 *            noInfo: boolean, hot: boolean, publicPath: string, contentBase: string}}
 *            the webpack development server configuration
 */
module.exports = function(paths) {
    // noinspection WebpackConfigHighlighting
    return {
        // log messages
        noInfo: true,
        stats: 'errors-only',
        clientLogLevel: 'silent',
        overlay: true,
        // server configuration
        compress: true,
        open: true,
        hot: true,
        contentBase: paths.testEnvPublic,
        publicPath: '/',
        watchContentBase: true
    };
};
