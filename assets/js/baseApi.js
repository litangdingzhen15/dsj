$.ajaxPrefilter(function (options) {
  options.url = 'http://big-event-api-t.itheima.net' + options.url;
  // if (options.url.indexof('/my/') !== -1) {
  //   options.headers = {
  //     Authorization: localStorage.getItem('token') || ''
  //   }
  // }
})
