import until from '../../until.js';
import defaultConfig from '../../defaultConfig.js'
import kaxios from './axios.js'

function createInstance(config) {
  var context = new kaxios(config);
  var request = until.bind(kaxios.prototype.request, context);
  until.extend(request, context, context);
  return request(defaultConfig)
}


export default createInstance