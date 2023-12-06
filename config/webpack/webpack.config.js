const { webpackConfig, merge } = require('shakapacker')

const sassLoaderConfig = {
  module: {
    rules: [
      {
        test:/.scss$/, 
        use: ["style-loader",
              "css-loader",
              "sass-loader" ],
        test: /\.css$/, 
        use: ["style-loader",
              "css-loader"]
     }
    ],
  },
};

module.exports = merge(webpackConfig, sassLoaderConfig);