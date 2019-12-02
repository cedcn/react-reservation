const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index',
  output: {
    library: 'Reservation',
    libraryTarget: 'umd',
    globalObject: "this",
    filename: 'reservation.js',
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },

  node: {
    Buffer: false,
  },

  devtool: 'source-map',
  performance: {
    hints: 'warning',
  },

  plugins: [],
}
