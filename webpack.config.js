const path = require("path")
const resolve = path.resolve
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: "development",
  optimization:{
    minimize: false // 关闭代码压缩，可选
  },
  target: 'web',
  entry: "./src/index.ts",
  // entry: {
  //   bundle: "./src/index.ts",
  //   bundle2: "./src/index.ts",
  // },
  output: {
    filename: 'bundle.js',
    // filename: '[name].[chunkhash:5].js',
    // path: [path.resolve(__dirname, "dist"), path.resolve('../.vite-ptoject/')],
    path: path.resolve('../vite-project/public/static'),

    libraryTarget: "umd",
    globalObject: "this",
    library: "mxxx"
  },
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, 'src')   // 别名设置
  //   }
  // },
  externals: {
    // const wsconfig = require('./wsconfig.json')
    'wsconfig': `require('./wsconfig.json')`
  },
  // 指定webpack打包的时候要使用的模块
  module: {
    // 指定要价在的规则
    rules: [
        {
            // test指定的是规则生效的文件,意思是，用ts-loader来处理以ts为结尾的文件
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }
    ]
  },
    // 设置哪些文件类型可以作为模块被引用
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: {
    errorDetails: true
  },
  // plugins: [
  //   //   new CopyWebpackPlugin([
  //   //     {
  //   //       from: resolve(__dirname, './static'), // 不打包直接输出的文件
  //   //       to: 'static', // 打包后静态文件放置位置
  //   //       ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
  //   //     }
  //   // ])
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: resolve(__dirname, './src/static'), to: 'static' }
  //     ],
  //   }
  // )
  // ]
}