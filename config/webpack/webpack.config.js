// const { webpackConfig, merge } = require('shakapacker')

import { generateWebpackConfig, merge } from 'shakapacker';

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

export default merge(sassLoaderConfig, webpackConfig);
