$(function () {
  const layer = layui.layer
  const form = layui.form
  initCate()
  // 初始化富文本编辑器
  initEditor()
  function initCate() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败')
        }
        const htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  // 1. 初始化图片裁剪器
  const $image = $('#image')

  // 2. 裁剪选项
  const options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 选择封面按钮点击的时候，让隐藏的文件选择框模拟点击
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
  })

  // 文件有上传时，拿到选择的图片
  $('#coverFile').on('change', function (e) {
    let files = e.target.files
    // 如果没有文件，returen
    if (files.length === 0) {
      return
    }
    // 生成图片的url地址
    var newImgURL = URL.createObjectURL(files[0])
    // 重新设定封面
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  // 定义文章的发布状态
  let art_state = '已发布'

  // 存为草稿按钮点击时候，状态变为草稿
  $('#btnSave2').on('click', function () {
    art_state = '草稿'
  })

  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    const fd = new FormData($(this)[0])
    fd.append('state', art_state)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        publishArticle(fd)
      })
  })
  function publishArticle(fd) {
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType:false,
      processData:false,
      success(res){
        if (res.status !== 0) {
          return layer.msg('发布文章失败')
        }
        layer.msg('发布文章成功')
        location.href = 'art_list.html'
      }
    })
  }
})