const fs = require("fs");
const path = require("path");
module.exports = function (source, sourceMap, meta) {
  const callback = this.async();
  const headerPath = path.resolve(__dirname, "../test-loader/index.js");
  fs.readFile(headerPath, "utf-8", function (err, result) {
    if (err) return callback(err);
    callback(null, result, sourceMap, meta);
  });
};
