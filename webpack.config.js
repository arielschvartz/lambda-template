const webpack = require('webpack');
const slsw = require('serverless-webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = async () => {
  const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
  return {
    entry: slsw.lib.entries,
    target: 'node',
    externals: [nodeExternals()],
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
      // We do not want to minimize our code.
      minimize: false
    },
    plugins: [
      new webpack.DefinePlugin({
        AWS_ACCOUNT_ID: `${accountId}`,
      }),
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  };
}();