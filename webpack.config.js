// export object that represents webpack configuration
const path = require('path')

module.exports = {
    // production or development
    mode: 'development',
    // entry file, where wabpack to look for js src file
    entry: './src/index.js',
    // path to output and name
    output: {
        // use path object to resolve new path of current directory - we need abs path
        path: path.resolve(__dirname, 'dist'),
        // filename of bundled file
        filename: "bundle.js"
    },
    // webpack will watch file and bundle ay changes
    watch: true
}