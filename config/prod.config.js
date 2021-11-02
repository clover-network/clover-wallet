const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./base.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "all",
      minSize: 0,
      minChunks: 4,
    },
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        NODE_DEBUG: JSON.stringify("null"),
      },
    }),
  ],
});
