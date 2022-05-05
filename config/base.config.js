const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    mainapp: path.join(__dirname, "../browser/extension/mainapp"),
    background: path.join(__dirname, "../backgroundScript/background"),
    contentScript: path.join(__dirname, "../contentScript/content-script"),
    inPageScript: path.join(__dirname, "../contentScript/in-page-script"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
  },
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      os: require.resolve("os-browserify/browser"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "public/Fonts",
          to: "Fonts",
        },
        {
          from: "public/img",
          to: "img",
        },
        {
          from: "public/manifest.json",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "public/index.html",
      chunks: ["mainapp"],
    }),
    new HtmlWebpackPlugin({
      filename: "background.html",
      template: "public/index.html",
      chunks: ["background"],
    }),
    new HtmlWebpackPlugin({
      filename: "window.html",
      template: "public/index.html",
      chunks: ["mainapp"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|otf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
