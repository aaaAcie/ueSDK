const path = require("path")
const resolve = path.resolve
module.exports = {
  mode: "development",
  optimization:{
      minimize: false // 关闭代码压缩，可选
  },
  target: 'web',
  entry: "./src/index.ts",
  output: {
    filename: 'bundle.js',
    // path: [path.resolve(__dirname, "dist"), path.resolve('../.vite-ptoject/')],
    path: path.resolve('../vite-project/'),

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
  }
}