/**
 * @typedef {import('webpack').Configuration} WebpackConfig
 */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")

const port = 3000

const isDevelopment = process.env.NODE_ENV === "development"

/**
 * @type {WebpackConfig}
 */
const config = {
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  mode: "development",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".scss"],
  },
  devtool: "source-map",
  optimization: {
    usedExports: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    hot: true,
    static: "./dist",
    port: port,
    open: true,
    watchFiles: {
      paths: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
      options: {
        ignored: /node_modules/,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      // chunks: ["app"],
      title: "epub",
      template: "./public/index.html",
    }),
    new ReactRefreshWebpackPlugin(),
    // TODO: configure eslint
    new ESLintPlugin({
      // Plugin options
      extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      eslintPath: require.resolve("eslint"),
      cache: true,
      resolvePluginsRelativeTo: __dirname,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(?:js|mjs|cjs|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // transform: {},
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                  development: isDevelopment,
                },
              ],
              ["@babel/preset-typescript"],
            ],
          },
        },
      },
    ],
  },
}
module.exports = config
