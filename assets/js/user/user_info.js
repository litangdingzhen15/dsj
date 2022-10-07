$(function(){
  let form = layui.form
  let layer = layui.layer
  // 自定义验证规则
  form.verify({
    // 添加验证属性，规定输入的字符长度
    nickname:function(value){
      if (value.length > 6) {
        return '昵称必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()
  // 页面一打开输入框应该显示当前的信息，先获取当前的基本资料数据
  function initUserInfo (){
    $.ajax({
      type:'GET',
      url:'/my/userinfo',
      success(res){
        // 如果获取数据失败，发出提示
        if (res.status !== 0) {
          return layer.msg(res.msg)
        }
        // 把获取到的数据快速赋值给表单，需要输入框有name属性，
        // 并且值和ajax返回的数据值名字相同，才能完成赋值
        form.val('formUserInfo',res.data)
      }
    })
  }

  // 重置按钮点击事件
  $('#btnReset').on('click',function(e){
    // 阻止重置按钮的默认清空表单行为
    e.preventDefault()
    // 刷新输入框内的用户资料
    initUserInfo()
  })

    // 修改基本资料表单提交请求
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    // 向接口提交信息表单内的值，用 $(this).serialize() 快速获取
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
        // 调用一下父元素的渲染头像函数
        window.parent.getUserInfo()
      }
    })
  })
})