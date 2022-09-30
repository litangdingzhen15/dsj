$(function () {
  getUserInfo()
  // let layer = layui.layer
  $('#btnLogout').on('click',function(){
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, 
    function(index){
      // 点击确认退出按钮时，清空本地的token值，返回到登陆页面
      localStorage.removeItem('token')
      location.href = 'login.html'
      layer.close(index);
    });
  })
})
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success(res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败!')
      }
      renderAvatar(res.data)
    },
    
    error(err){
      console.log(123)
    }
  })
}

function renderAvatar(user) {
  // 获取用户昵称或者用户名
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 如果用户有头像，则显示；文字隐藏
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } 
  // 否则头像隐藏，显示文字
  else {
    $('.layui-nav-img').hide()
    // 将用户名的第一个字转成大写
    let first = name[0].toUpperCase()
    // 渲染到页面上
    $('.text-avatar').html(first).show()
  }
}