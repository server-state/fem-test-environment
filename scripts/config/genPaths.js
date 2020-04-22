const fs = require('fs');
const path = require('path');

// constant paths
const testEnvRoot = path.resolve(__dirname, '../../');
const testEnvPublic = path.join(testEnvRoot, 'public');
const testEnvPublicHTML = path.join(testEnvPublic, 'index.html');
const testEnvSrc = path.join(testEnvRoot, 'src');
const testEnvSrcIndex = path.join(testEnvSrc, 'index.js');

/**
 * A path library for the fem test environment.
 * @param {string?} [externalFEMPath] if defined: the absolute path to the external fem
 *                                    otherwise it will use the internal mock
 * @returns {{femSrc: string, testEnvRoot: string, testEnvPublic: string,
 *            femSrcSamples: string, testEnvPublicHTML: string, femRoot: string, testEnvSrcIndex: string,
 *            testEnvSrc: string, femSrcIndex: string, femDist: string}}
 *                all required paths
 */
module.exports = function(externalFEMPath) {
    // dynamic paths
    let femRoot;
    let femSrc;
    if (externalFEMPath) {
        // external path given -> do checks
        femRoot = path.resolve(externalFEMPath);
        femSrc = path.join(femRoot, 'src');
    } else {
        // no external path given -> use simple-fem as root in src folder
        femRoot = path.join(testEnvRoot, "simple-fem");
        femSrc = path.join(femRoot, 'src');
    }
    const femPackageJSON = path.join(femRoot, 'package.json');

    if (!fs.existsSync(path.join(femRoot, 'package.json'))) {
        throw 'No package.json found. Please make sure that you\'re using a fem directory.';
    }
    if (!fs.lstatSync(femSrc).isDirectory()) {
        throw 'No src/ folder found. Please make sure that you\'re using a fem directory.';
    }

    const femSrcIndex = path.join(femSrc, 'index.js');
    const femSrcSamples = path.join(femSrc, 'sample-data.js');

    if (!fs.existsSync(femSrcIndex)) {
        throw "No fem index.js found. Please make sure that you not accidentally deleted this file.";
    }
    if (!fs.existsSync(femSrcSamples)) {
        throw "No fem sample-data.js found. Please make sure that you not accidentally deleted this file.";
    }

    const femDist = path.join(femRoot, 'dist');

    return {
        testEnvRoot,
        testEnvPublic,
        testEnvPublicHTML,
        testEnvSrc,
        testEnvSrcIndex,
        femRoot,
        femSrc,
        femPackageJSON,
        femSrcIndex,
        femSrcSamples,
        femDist
    };
};
