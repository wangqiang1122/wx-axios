import until from '../../until.js';
import defaultConfig from '../../defaultConfig.js';
import Interceptor from './InterceptorManager.js';
import { request } from '../../sendBox/http.js';

function Axios(config) {
  this.config = until.merageConfig(defaultConfig, config);  // 拦截器
  this.Interceptor = {
    request: new Interceptor(), // 请求拦截器
    response: new Interceptor(), // 返回拦截器
  };
}
Axios.prototype.request = function (config){
  //请求方法封装
  var Config = until.merageConfig(this.config, config);
  var chan = [this.dispatchRequest, undefined];
  console.log(this.Interceptor.response)
  while (this.Interceptor.request.handle.resolve.length) {
    chan.unshift(this.Interceptor.request.handle.resolve.shift(), this.Interceptor.request.handle.reject.shift())
  }
  // 返回拦截器
  while (this.Interceptor.response.handle.resolve.length) {
    chan.push(this.Interceptor.response.handle.resolve.shift(), this.Interceptor.response.handle.reject.shift())
  }
  var p = Promise.resolve(Config);
  // 遍历拦截器哈数栈 并执行里面的函数
  while (chan.length) {
    p = p.then(chan.shift(), chan.shift())
  }
  return p
}

// 封装请求
Axios.prototype.dispatchRequest = function (config) {
  return request(config)
}

// 添加请求别名 无data
var method1 = ['delete', 'get', 'head', 'options'];
while (method1.length) {
  var methodName = method1.pop();
  (function (methodName) {
    Axios.prototype[methodName] = function (url, config) {
      return this.request(until.deepMerage(config || {}, {
        url: url,
        method: methodName,
      }))
    }
  })(methodName)
}
// 添加请求别名 有data
var method2 = ['post', 'put', 'patch'];

while (method2.length) {
  var method2Name = method2.pop();
  (function (methodName) {
    Axios.prototype[methodName] = function (url, data, config) {
      return this.request(until.deepMerage(config||{}, {
        url: url,
        method: method2Name,
        data: data || {},
      }))
    }
  })(method2Name)
}
Axios.create = function (config) {
  let context = new Axios(config);
  let request = until.bind(Axios.prototype.request, context);
  until.extend(request, context, context);
  return new Axios(config)
}
export default Axios