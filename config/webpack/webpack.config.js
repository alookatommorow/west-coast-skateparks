// const { webpackConfig, merge } = require('shakapacker')

const { generateWebpackConfig, merge } = require('shakapacker');

const sassLoaderConfig = {
  module: {
    rules: [
      {
        // test: /.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const webpackConfig = generateWebpackConfig(sassLoaderConfig);

module.exports = merge(sassLoaderConfig, webpackConfig);
