const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
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
        }, {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        }, {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
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