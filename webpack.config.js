const path = require('path');

module.exports = {
  entry: './test/index.jsx',
  output: {
    path: path.join(__dirname, 'test'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]'],
      },
    ],
  },
};
