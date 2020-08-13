// 数据请求
export const request =(config) => new Promise((reslove,reject)=>{
  wx.request({
    url: config.baseUrl+config.url,
    data: config.data,
    header: config.header,
    method: config.method||'GET',
    dataType: config.dataType||'',
    responseType: config.responseType||'',
    success: function(res) {
      let responseDate = {
        config: config,
        data: res.data,
        status: res.statusCode,
      }
      reslove(responseDate);
    },
    fail: function (res) {
      reject(res);
    },
    complete: function (res) {
      config.complete && config.complete(res)
     },
  })
})

