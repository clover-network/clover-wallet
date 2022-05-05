module.exports = {
  presets: [
    ["@babel/preset-react"],
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "79",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.12.1",
      },
    ],
  ],
};
