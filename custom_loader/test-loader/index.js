module.exports = function (source, sourceMap) {
  // 获取到用户给当前 Loader 传入的 options
  const options = this.getOptions();
  console.log({ options, sourceMap });
  // 关闭该 Loader 的缓存功能
  // this.cacheable(false);
  return source;
};
// 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
// 判断 source instanceof Buffer === true
// Loader 返回的类型也可以是 Buffer 类型的
// 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
// 是否是二进制文件导出

// module.exports.raw = true;