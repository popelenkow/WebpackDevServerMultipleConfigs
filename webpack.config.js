/** @typedef {import("webpack").Configuration} Configuration */
/** @typedef {import("webpack-dev-server").Configuration} DevServerConfiguration */

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");

/** @type {Configuration} */
const config = {
    mode: "development",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    devServer: {
        hot: "only",
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    stats: { modules: false, children: false, entrypoints: false }
};

const commonConfig = merge(config, {
    entry: {
        common: "./src/common.ts"
    },
    output: {
        library: {
            type: "umd"
        }
    },
});
const mainConfig = merge(config, {
    entry: {
        index: "./src/index.ts",
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/favicon.ico", to: "./favicon.ico" },
                { from: "./src/index.html", to: "./index.html" }
            ]
        })
    ]
});

const configs = [commonConfig, mainConfig];

for (let i = 0; i < configs.length; i++) {
    if (i !== 0) delete configs[i].devServer;
}

module.exports = configs;
