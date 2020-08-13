# wx-axios
微信版axios

# wx.axios基础版本
*支持基本的请求功能及拦截器功能*
demo
```
var h = j.create({
  baseUrl: 'xxxxx'
})
h.Interceptor.request.use(function (res) {
  // 请求拦截器
  return res
})
h.Interceptor.response.use(function (res) {
  // 返回拦截器
  return res.data
})
h.post('/roleService/getUserPermission.xco',
  { module_code: 'task_index' }).then((res) => {
    console.log(res);
  })
```  



# 后面会继续更新 添加上传文件 如有任何问题请提交issue 