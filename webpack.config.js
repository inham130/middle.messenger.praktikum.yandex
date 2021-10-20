const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './index.ts',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'messenger.bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
        handlebars: 'handlebars/dist/handlebars.min.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, 'tsconfig.json'),
              },
            },
          ],
          exclude: /(node_modules)/
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.png/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: 'index.html'
    })],
    devServer: {
      static: {
          directory: path.join(__dirname, 'public'),
      },
      watchFiles: ['src/**/*.ts', 'src/**/*.scss'],
      compress: true,
      hot: true,
      port: 3000,
    }
  };