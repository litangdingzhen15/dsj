$(function () {
  let form = layui.form
  let layer = layui.layer
  // 定义验证规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 新密码框的值如果和旧密码框的值相同的话（用属性选择器选中，.val()拿到value值）
    // return 提示
    samePwd:function(value){
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同!'
      }
    },
    // 确认新密码的值如果跟新密码的值不一样的话
    // return 提示
    rePwd:function(value){
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })

  // 表单提交时事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    // 向接口发送数据
    $.ajax({
      type:'POST',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success(res){
        if (res.status !== 0) {
          return layer.msg('修改密码失败')
        }
        layer.msg('修改密码成功')
        // 清空表单内输入框的值
        // $('.layui-form')[0].reset()
        $('#btnReset').click()
      }
    })
  })
})