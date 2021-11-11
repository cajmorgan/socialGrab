import { path, __dirname } from './dirname.js';

export default {
  entry: './client/src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/build'),
    },
    compress: true,
    port: 9001,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client/build'),
  },
};