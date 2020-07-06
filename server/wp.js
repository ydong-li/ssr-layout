// webpack/webpack.dev.config.js
//webpack 配置文件
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const resolvePath = (pathStr) => path.resolve(__dirname, pathStr);
//构建前清理目录
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// process.env.BABEL_ENV = 'node'; //设置 babel 的运行环境

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  node: {
    __dirname: true // 防止路径出错
  },
  entry: resolvePath('./index.js'), //入口文件
  output: {
    filename: 'index0.js',
    path: resolvePath('./'),
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          "plugins": [
            require.resolve('./plugins/no-require-css')  //引入        
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          // 服务端渲染不能用 style-loader，因为 node 没有 document 对象，无法插入 style 标签
          // 服务端本来就不能渲染 dom，只是提供 html/css/js 代码给浏览器，交给浏览器去渲染
          // 服务端返回的 html 源码里，没有 style 标签
          // 而在浏览器中的 html 源码里，有 style 标签，是通过 js 插入进去的
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
      // {
      //   test: /.(png|jpg|gif)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       emitFile: false,
      //       name: isProd ? 'img/[name].[hash:8].[ext]' : 'img/[name].[ext]',
      //       publicPath: isProd
      //         ? '/'
      //         : `http://${__LOCAL_IP__}:${proConfig.wdsPort}`,
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: `"${process.env.NODE_ENV}"` },
      __IS_PROD__: isProd,
      __SERVER__: true,
    }),
  ],
  resolve: {
    alias: {
      //定义dist 目录别名，方便导入模块
      '@dist': path.resolve(__dirname, '../dist'),
    },
  },
};
