const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const BasicPlugin = require("./custom_plugin/basic-plugin");
module.exports = function (env) {
  return {
    cache: {
      // 启用文件缓存
      type: "filesystem",
    },
    entry: {
      // 入口文件
      index: "./src/react/index.tsx",
      // index: "./src/client/index.js",
    },
    output: {
      // 文件名，根据 chunk 进行命名
      filename: "[name]_[chunkhash:8].js",
      // 异步模块文件
      chunkFilename: (pathData) => {
        return pathData.chunk.name === "index"
          ? "[name].js"
          : "[name]/[name].js";
      },
      // 打包文件目录
      path: path.resolve(__dirname, "./dist"),
      // publicPath: "https://js/assets/", // cdn 路径
      publicPath: "/", // react-router 子路由刷新报错问题
      clean: true,
      // umd
      // library: {
      //   name: "MyLibrary",
      //   type: "umd",
      //   umdNamedDefine: true,
      //   export: ['default', 'subModule']
      // },
      // globalObject: "this",
      // 统一设定 asset/resource 路径
      assetModuleFilename: "resource/[hash][ext][query]",
    },
    module: {
      // 忽略对部分没采用模块化的文件的递归解析和处理
      noParse: [/react\.production\.min\.js$/, /lodash/],
      rules: [
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "thread-loader",
            // {
            //   loader: "test-loader",
            //   options: {
            //     "test-loader": "test-loader",
            //   },
            // },
            // "source-map-loader",
            // "async-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
              },
            },
            "postcss-loader",
          ].filter(Boolean),
          include: path.resolve(__dirname, "src"),
          // package.json 设置 sideEffects 为 false 时
          sideEffects: true,
        },
        {
          test: /\.(?:js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            "thread-loader",
            {
              loader: "babel-loader",
              options: {
                // 启用缓存
                cacheDirectory: true,
              },
            },
          ].filter(Boolean),
          include: path.resolve(__dirname, "src"),
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
          exclude: /node_modules/,
          ...(devMode
            ? {}
            : {
                generator: {
                  // 自定义文件名，覆盖 output.assetModuleFilename
                  filename: "[hash][ext][query]",
                  // 自定义 cdn 引入路径地址
                  publicPath: "https://cdn.images.com/",
                  // 打包输出地址
                  outputPath: "cdn.images.com/",
                },
              }),
        },
        {
          test: /\.svg/,
          type: "asset/inline",
          generator: {
            // 压缩 SVG
            dataUrl: (content) => {
              content = content.toString();
              return svgToMiniDataURI(content);
            },
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: "asset/resource",
          exclude: /node_modules/,
          ...(devMode
            ? {}
            : {
                generator: {
                  filename: "[hash][ext][query]",
                  publicPath: "https://cdn.font.com/",
                  outputPath: "cdn.font.com/",
                },
              }),
        },
        {
          test: /\.txt/,
          type: "asset/source",
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        react$: path.resolve(
          __dirname,
          devMode
            ? "./node_modules/react/umd/react.development.js"
            : "./node_modules/react/umd/react.production.min.js"
        ),
        "react-dom$": path.resolve(
          __dirname,
          devMode
            ? "./node_modules/react-dom/umd/react-dom.development.js"
            : "./node_modules/react-dom/umd/react-dom.production.min.js"
        ),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      modules: [
        path.resolve(__dirname, "src/client"),
        path.resolve(__dirname, "node_modules"),
      ],
      mainFields: ["main"],
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
    resolveLoader: {
      modules: [
        "node_modules",
        // path.resolve(__dirname, "custom_loader")
      ],
      extensions: [".js", ".json"],
      mainFields: ["loader", "main"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "webpack init",
        template: "index.html",
      }),
      ...(devMode
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: `[name]_[contenthash:8].css`,
            }),
          ]),
      new webpack.EnvironmentPlugin({
        ENV: env.ENV,
      }),
      new ESLintPlugin(),
      new StylelintPlugin(),
      // new BasicPlugin({
      //   doneCallback() {
      //     console.log("打包成功");
      //   },
      //   failCallback() {
      //     console.log("打包失败");
      //   },
      // }),
      // ...(devMode ? [] : [new WebpackBar()]),
      // ...(devMode ? [] : [new BundleAnalyzerPlugin()]),
    ],
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      usedExports: devMode ? true : false,
    },
    devtool: devMode ? "eval-cheap-module-source-map" : "hidden-source-map",
    target: "web",
    externals: {
      // 把导入语句里的 lodash 替换成运行环境里的全局变量 lodash
      lodash: "lodash",
    },
    mode: devMode ? "development" : "production",
    watchOptions: {
      ignored: /node_modules/,
    },
    stats: {
      // 告诉了你哪个文件因为什么原因导致了不能适用 Scope Hoisting
      optimizationBailout: devMode ? true : false,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "/public"),
        // publicPath: "/",
      },
      historyApiFallback: true,
      // https: true,
      // compress: true,
      open: false,
      // host: "local-ip",
      port: 8080,
      proxy: {
        "/api": {
          target: "接口",
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
          logger: "debug",
        },
      },
    },
  };
};

// module.exports = function (env) {
//   return smp.wrap(config(env));
// };
