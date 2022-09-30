$(function () {
  // 根目录
  const baseUrl = 'http://big-event-api-t.itheima.net'
  // 注册板块点击时，登录板块隐藏，注册页面显示
  $('#go2Reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 登录板块点击时，注册板块隐藏，登录页面显示
  $('#go2Login').on('click', function () {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })
  // 从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  form.verify({
    // 为密码输入框添加验证功能
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 检测两次密码是否一致
    repwd: function (value) {
      let pwd = $('.reg-wrap [name=password]').val()
      if (pwd !== value) {
        return alert('两次密码不一致')
      }
    }
  })

  // 表单注册提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: `/api/reguser`,
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(), 
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("注册成功")
      }
    })
    $('#go2Login').click()
  })
  // 登录表单提交事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      type:'POST',
      url:`/api/login`,
      data:$(this).serialize(),
      success(res){
        // 把请求回来的token参数存到本地，并且跳转到index页面
        localStorage.setItem('token',res.token)
        location.href = 'index.html'
      }
    })
  })

})