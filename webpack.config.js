const webpack = require("webpack");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = (devMode) => {
  const plugins = [new CopyPlugin([{ from: "./web/sources", to: "sources" }])];

  if (devMode) {
    plugins.push(
      new webpack.DefinePlugin({
        DEBUG: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      })
    );

    plugins.push(
      new WebpackBuildNotifierPlugin({
        title: "Grow Wellbeing - Admin Panel",
      })
    );
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("production"),
      })
    );
  }

  return {
    mode: devMode ? "development" : "production",
    watch: devMode ? true : false,
    entry: {
      index: ["./web/bootstrap.js"],
    },
    output: {
      path: path.join(__dirname, ".tmp"),
      publicPath: "/",
      filename: "app.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.s?css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              // options: {
              //   modules: true
              // }
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          loader: "url-loader",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.md$/,
          loader: "raw-loader",
        },
      ],
    },
    plugins,
    devtool: devMode ? "source-map" : "",
    optimization: {
      minimize: !devMode,
      moduleIds: "size",
      chunkIds: "total-size",
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      flagIncludedChunks: true,
      concatenateModules: true,
    },
    performance: {
      hints: false,
    },
  };
};
