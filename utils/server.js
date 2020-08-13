import j from '../axios/lib/core/axios.js'
var h = j.create({
  baseUrl: 'https://camp.h5.aixbx.com'
})
h.Interceptor.request.use(function (res) {
  console.log('2222')
  console.log(res)
  return res
})
h.Interceptor.response.use(function (res) {
  console.log('7777')
  console.log(res)
  return res.data
})
h.post('/roleService/getUserPermission.xco',
  { module_code: 'task_index' }).then((res) => {
    console.log(res);
    console.log('ddddd');
  })