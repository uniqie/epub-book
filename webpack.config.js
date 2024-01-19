/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const port = 3000;

/**
 * @type {WebpackConfig}
 */
const config = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    // filename: "bundle.js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  mode: "development",
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  devtool: "eval",
  optimization: {
    nodeEnv: "development",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    liveReload: true,
    static: "./dist",
    compress: true,
    port: port,
    watchFiles: ["src/**/*.js"],
    client: {
      progress: true,
      reconnect: 5,
      webSocketURL: {
        hostname: "0.0.0.0",
        pathname: `/proxy/${port}/ws`,
        port: 80,
        protocol: "ws",
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["app"],
      title: "epub",
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                  development: process.env.NODE_ENV === "development",
                },
              ],
            ],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
      },
    ],
  },
};
module.exports = config;
