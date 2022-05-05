const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const common = require("./base.config");
module.exports = merge(common, {
  mode: "development",
  // devtool: "inline-source-map",
  watch: true,
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   compress: true,
  //   port: 9000,
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        NODE_DEBUG: JSON.stringify("null"),
      },
    }),
  ],
});
