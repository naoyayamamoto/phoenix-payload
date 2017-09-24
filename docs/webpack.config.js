var path = require('path');
module.exports = {
    entry: "./docs/src/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/"
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
        contentBase: ['./docs/', './docs/dist/'],
        compress: true,
        inline: true,
        port: 3000
    },
};
