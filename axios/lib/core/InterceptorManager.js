function Interceptor() {
  this.handle = {
    resolve: [],
    reject: [],
  };
}
Interceptor.prototype.use = function (fn1, fn2) {
  this.handle.resolve.push(fn1)
  this.handle.reject.push(fn2)
};
export default Interceptor;