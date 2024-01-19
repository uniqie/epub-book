/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

const port = 3000

/**
 * @type {WebpackConfig}
 */
const config = {
  entry: {
    index: "./src/index.tsx",
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
      "@/*": ["./src/*"],
      "@pages": path.resolve(__dirname, "src/pages"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs|ts|tsx)$/,
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
              ["@babel/preset-typescript"],
            ],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
      },
    ],
  },
}
module.exports = config
