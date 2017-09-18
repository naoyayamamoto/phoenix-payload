var path = require('path');
module.exports = {
    entry: "./demo/src/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: [
            "node_modules",
            path.resolve(__dirname, "../dist/")
        ]
    },

    module: {
        rules: [{
                test: /\.ts?$/,
                loader: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // Configuration for dev server
    devServer: {
        contentBase: './demo/',
        port: 3000
    },
};
