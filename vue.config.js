/**
 * Created by miaozhendong@live.com on 2019/6/10.
 */
const path = require('path')
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')// 引入gzip压缩插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require("webpack-merge")
const tsImportPluginFactory = require("ts-import-plugin")
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

// vue.config.js 详情参考：https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
  // 配置选项...
  publicPath: './', // 部署应用包时的根路径
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本。
  productionSourceMap: false, // 关闭生产环境source map，加速生产环境构建，并减少包体积
  lintOnSave: true, // 保存时 lint 代码
  // CSS配置
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    extract: process.env.NODE_ENV === 'production',
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
            // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            selectorBlackList: ['ignore-rem'], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 2 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ]
      },
      stylus: {
        import: '~@/assets/styles/variables.styl'
      },
      sass: {
        // 引入全局变量 @/ 是 src/ 的别名
        prependData: '@import "@/assets/styles/variables.scss";'
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: 'true; @import "@/assets/styles/variables.less";'
          }
        }
      }
    }
  },
  // webpack基础配置
  configureWebpack: config => {
    // 配置polyfill
    // config.entry.app = ['babel-polyfill', './src/main.js']
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())

      config.plugins.push(new CompressionPlugin({ // gzip压缩配置
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }))
      // 为生产环境修改配置...
      // config.plugins.push(new SkeletonWebpackPlugin({
      //   webpackConfig: {
      //     entry: {
      //       app: path.join(__dirname, './src/config/skeleton.js')
      //     }
      //   },
      //   minimize: true,
      //   quiet: true
      // }))
    } else if (process.env.NODE_ENV === 'analyze') {
      // config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  // 修改webpack相关配置
  chainWebpack: config => {
    // 配置文件alias
    config.resolve.alias
      .set('@assets', resolve('src/assets'))
      .set('@config', resolve('src/config'))
      .set('@components', resolve('src/components'))
      .set('@layout', resolve('src/views/layout'))
      .set('@utils', resolve('src/assets/scripts/utils'))
      .set('@scripts', resolve('src/assets/scripts'))
      .set('@styles', resolve('src/assets/styles'))
      .set('@views', resolve('src/views'))

    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    config.output.filename('[name].[hash].js').end()
    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/images/svgs')).end()
    config.module.rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/images/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      })
  },
  // 第三方插件的选项
  pluginOptions: {
    // ...
  }
}
