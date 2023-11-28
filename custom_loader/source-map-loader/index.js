module.exports = function (source) {
  const sourceMap = { sourceMap: 1 };
  this.callback(null, source, sourceMap);
  return source;
};