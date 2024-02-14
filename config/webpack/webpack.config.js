const { generateWebpackConfig, merge } = require('shakapacker');
const ForkTSCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = generateWebpackConfig({
  plugins: [new ForkTSCheckerWebpackPlugin()],
});

// import { generateWebpackConfig, merge } from 'shakapacker';

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
// webpackConfig = merge()
module.exports = merge(sassLoaderConfig, webpackConfig);

// export default merge(sassLoaderConfig, webpackConfig);
