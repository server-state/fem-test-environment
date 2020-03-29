const fs = require('fs');
const path = require('path');

// constant paths
const testEnvRoot = path.resolve(__dirname, '../../');
const testEnvPublic = path.join(testEnvRoot, 'public');
const testEnvPublicHTML = path.join(testEnvPublic, 'index.html');
const testEnvSrc = path.join(testEnvRoot, 'src');
const testEnvSrcIndex = path.join(testEnvSrc, 'index.js');

/**
 * A path library for the cbm test environment.
 * @param {string?} [externalCbmPath] if defined: the absolute path to the external cbm
 *                                    otherwise it will use the internal mock
 * @returns {{cbmSrc: string, testEnvRoot: string, testEnvPublic: string,
 *            cbmSrcSamples: string, testEnvPublicHTML: string, cbmRoot: string, testEnvSrcIndex: string,
 *            testEnvSrc: string, cbmSrcIndex: string, cbmDist: string}}
 *                all required paths
 */
module.exports = function(externalCbmPath) {
    // dynamic paths
    let cbmRoot;
    let cbmSrc;
    if (externalCbmPath) {
        // external path given -> do checks
        cbmRoot = path.resolve(externalCbmPath);
        cbmSrc = path.join(cbmRoot, 'src');
    } else {
        // no external path given -> use empty cbm
        cbmRoot = testEnvRoot;
        cbmSrc = path.join(cbmRoot, 'src/empty-cbm');
    }
    const cbmPackageJSON = path.join(cbmRoot, 'package.json');

    console.log('CBM Root:', cbmRoot);
    console.log('CBM package.json', path.join(cbmRoot, 'package.json'));
    if (!fs.existsSync(path.join(cbmRoot, 'package.json'))) {
        throw 'No package.json found. Please make sure that you\'re using a cbm directory.';
    }
    if (!fs.lstatSync(cbmSrc).isDirectory()) {
        throw 'No src/ folder found. Please make sure that you\'re using a cbm directory.';
    }

    const cbmSrcIndex = path.join(cbmSrc, 'index.js');
    const cbmSrcSamples = path.join(cbmSrc, 'sample-data.js');

    if (!fs.existsSync(cbmSrcIndex)) {
        throw "No cbm index.js found. Please make sure that you not accidentally deleted this file.";
    }
    if (!fs.existsSync(cbmSrcSamples)) {
        throw "No cbm sample-data.js found. Please make sure that you not accidentally deleted this file.";
    }

    const cbmDist = path.join(cbmRoot, 'dist');

    return {
        testEnvRoot,
        testEnvPublic,
        testEnvPublicHTML,
        testEnvSrc,
        testEnvSrcIndex,
        cbmRoot,
        cbmSrc,
        cbmPackageJSON,
        cbmSrcIndex,
        cbmSrcSamples,
        cbmDist
    };
};
