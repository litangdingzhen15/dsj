$.ajaxPrefilter(function (options) {
  options.url = 'http://big-event-api-t.itheima.net' + options.url
  if (options.url.includes('/my/')){
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
})
