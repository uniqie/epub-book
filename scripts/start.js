const express = require("express");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const compiler = webpack(webpackConfig);

const app = express();
app.use(require("webpack-hot-middleware")(compiler));