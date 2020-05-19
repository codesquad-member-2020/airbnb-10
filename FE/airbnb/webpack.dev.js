// const path = require("path");
// const webpack = require("webpack");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const Dotenv = require("dotenv-webpack");

// module.exports = {
//   mode: "development",

//   entry: "./src/index.tsx",

//   devServer: {
//     historyApiFallback: true,
//     inline: true,
//     port: 3000,
//     hot: false,
//     publicPath: "/",
//   },

//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: ["babel-loader"],
//       },
//       {
//         test: /\.(ts|tsx)$/,
//         use: ["babel-loader", "ts-loader"],
//       },
//       {
//         test: /\.(jpg|png)$/,
//         loader: "file-loader",
//         options: {
//           name: "[name].[ext]?[hash]",
//         },
//       },
//     ],
//   },

//   resolve: {
//     extensions: [".js", "jsx", ".ts", ".tsx"],
//   },

//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       filename: "index.html",
//       template: "public/index_dev.html",
//     }),
//     new Dotenv({
//       path: path.resolve(__dirname, "./.env.development"),
//     }),
//   ],
// };

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js?$/,
        use: ["babel-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
    new Dotenv({
      path: path.resolve(__dirname, "./.env.development"),
    }),
  ],
};
