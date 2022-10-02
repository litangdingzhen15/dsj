$(function(){
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname:function(value){
      if (value.length > 6) {
        return '昵称必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()
  function initUserInfo (){
    $.ajax({
      type:'GET',
      url:'/my/userinfo',
      success(res){
        if (res.status !== 0) {
          return layer.msg(res.msg)
        }
        form.val('formUserInfo',res.data)
      }
    })
  }

  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
    console.log(123)
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      type:'POST',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success(res){
        if (res.status !==0) {
          return layer.msg('修改用户信息失败')
        }
        layer.msg('修改用户信息成功')
        // window.parent.location.reload()
        window.parent.getUserInfo()
      }
    })
  })
})