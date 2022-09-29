$(function(){
  getUserInfo()
})
function getUserInfo (){
  $.ajax({
    type:'GET',
    url:'/my/userinfo',
    headers:{
      Authorization:localStorage.getItem('token') || ''
    },
    success(res){
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败!')
      }
      renderAvatar(res.data)
    }
  })
}

function renderAvatar(user){
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  } else{
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}