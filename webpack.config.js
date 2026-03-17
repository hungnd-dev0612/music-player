const path = require("path");

module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
    devServer: {
    static: {
      directory: path.join(__dirname), // phục vụ từ root, nơi có index.html
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true
  },
  mode: "development",
};