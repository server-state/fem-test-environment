const webpack = require('webpack');
const cli = require('cli');
const chalk = require('chalk');

const clearConsole = require('./clear-console');

const isInteractive = process.stdout.isTTY;

/**
 * Create a new webpack compiler based on a initial webpack config.
 * @param config initial webpack config
 * @returns {Compiler|MultiCompiler} webpack compiler
 */
module.exports = function(config) {
    let compiler;
    try {
        compiler = webpack(config);
    } catch (error) {
        cli.fatal('Can not compile.');
    }

    compiler.hooks.beforeCompile.tap('invalid', () => {
        // nice user output, so no usage of cli tool
        if (isInteractive) {
            clearConsole();
        }
        console.log(chalk.yellow.bold('Compiling ...'));
    });

    compiler.hooks.done.tap('done', stats => {
        // nice user output, so no usage of cli tool
        if (isInteractive) {
            clearConsole();
        }

        const statsRes = stats.toJson({
            all: false,
            warnings: true,
            errors: true
        });

        // nice user output, so no usage of cli tool
        if (statsRes.errors.length > 0) {
            console.log(chalk.red.bold('Can not compile.'));
            console.log(JSON.stringify(statsRes.errors, null, 2));
        } else if (statsRes.warnings.length > 0) {
            console.log(chalk.yellow.bold('Compiled with warnings.'));
            console.log(JSON.stringify(statsRes.warnings, null, 2));
        } else {
            console.log(chalk.green.bold('Successfully compiled.'));
        }
    });

    return compiler;
};