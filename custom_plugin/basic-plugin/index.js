class BasicPlugin {
  constructor({ doneCallback, failCallback }) {
    // 存下在构造函数中传入的回调函数
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }

  apply(compiler) {
    compiler.hooks.done.tap("BasicPlugin", (stats) => {
      // 在 done 事件中回调 doneCallback
      this.doneCallback?.(stats);
    });
    compiler.hooks.failed.tap("BasicPlugin", (err) => {
      // 在 failed 事件中回调 doneCallback
      this.failCallback?.(err);
    });
  }
}
// 导出插件

module.exports = BasicPlugin;