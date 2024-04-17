const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const webpackConfig = require("../webpack.config")
const compiler = webpack(webpackConfig)

const app = new WebpackDevServer(compiler)

app.start()
