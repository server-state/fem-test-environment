module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            testSrc: ['test-src']
        },
        copy: {
            testSrc: {
                files: [
                    {expand: true, cwd: 'src', src: '**', dest: 'test-src/'}
                ]
            }
        },
        replace: {
            testSrcApp: {
                src: ['src/App.js'],
                dest: 'test-src/',
                replacements: [{
                    from: 'femSrcIndex',
                    to: '../tests/mock-fem/index'
                }, {
                    from: 'femSrcSamples',
                    to: '../tests/mock-fem/sample-data'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('before-test', ['clean:testSrc', 'copy:testSrc', 'replace:testSrcApp']);
};
