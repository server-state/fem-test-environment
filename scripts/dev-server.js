const cli = require('cli');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');

const genPaths = require('./config/genPaths');
const genWebpackConfig = require('./config/genWebpackConfig');
const genDevServerConfig = require('./config/genDevServerConfig');

const clearConsole = require('./utils/clear-console');
const createCompiler = require('./utils/create-compiler');

const isInteractive = process.stdout.isTTY;
const HOST = '127.0.0.1';
const PORT = 3001;

/**
 * Start webpack dev server with nice output.
 * @param {string?} [externalCbmPath] if defined: the absolute path to the external cbm
 *                                    otherwise it will use the internal mock
 */
module.exports = function(externalCbmPath) {
    cli.debug('external cbm path: ' + externalCbmPath);
    let paths = null;
    try {
        cli.debug('Generate required paths');
        paths = genPaths(externalCbmPath);
        cli.ok('Paths generated');
        cli.debug(JSON.stringify(paths, null, 2));
    } catch (error) {
        cli.fatal(error);
    }

    cli.debug('Initialize webpack compiler');
    const webpackConfig = genWebpackConfig(paths);
    cli.debug('Generated Webpack config: ' + JSON.stringify(webpackConfig, null, 2));
    const compiler = createCompiler(webpackConfig);
    cli.ok('Webpack compiler initialized');

    cli.debug('Initialize webpack development server');
    const devServerConfig = genDevServerConfig(paths);
    cli.debug('Generated development server config: ' + JSON.stringify(devServerConfig, null, 23));
    const devServer = new WebpackDevServer(compiler, devServerConfig);
    cli.ok('Webpack dev server initialized');

    cli.debug('Start development server');
    devServer.listen(PORT, HOST, err => {
        if (err) {
            //clearConsole();
            console.log(chalk.red.bold('Can not compile.'));
            console.log(err);
        }
        if (isInteractive) {
            //clearConsole();
        }

        console.log(chalk.cyan.bold('Starting CBM test environment ...'));
    });
};