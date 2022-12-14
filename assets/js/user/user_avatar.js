$(function () {
  const layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 上传按钮点击事件
  $('#btnChooseImage').on('click', function () {  
    // 给隐藏的文件选择框模拟点击事件
    // $('#file').click()
    $('#file').trigger('click')
  })

  // 提交文件事件
  $('#file').on('change', function (e) {
    // 拿到提交的文件
    const filelist = e.target.files
    // 如果文件长度小于 1 （没有文件）的话，提示终止
    if (filelist.length < 1) {
      return layer.msg('请选择图片')
    }
    // 拿到提交的文件
    const file = e.target.files[0]
    const newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 确定按钮点击事件
  $('#btnUpload').on('click', function () {
    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

      // 向接口发送参数
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success(res) {
        // 如果失败，终止提示
        if (res.status !== 0) {
          return layer.msg('上传头像失败！')
        }
        layer.msg('上传头像成功！')
        // 刷新页面
        window.parent.getUserInfo()
      }
    })
  })
})