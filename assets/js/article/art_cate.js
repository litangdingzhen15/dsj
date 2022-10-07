$(function () {
  const layer = layui.layer
  const form = layui.form
  initArtCateList()

  // 渲染页面函数
  function initArtCateList() {
    // 发起数据请求
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        // 使用模板引擎渲染表格数据
        const htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  let indexAdd = null
  // 添加类别按钮点击事件
  $('#btnAddCate').on('click', function () {
    // 引入弹出层
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '新增文章分类',
      content: $('#dialog-add').html()
    })
  })

  // 添加类别弹出层确认提交时
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    // 发送请求
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败')
        }
        // 再次渲染页面
        initArtCateList()
        // 提示信息
        layer.msg('新增分类成功')
        // 关闭添加类别弹出层
        layer.close(indexAdd)
      }
    })
  })

  let indexEdit = null
  // 编辑按钮点击事件
  $('tbody').on('click', '#btn-edit', function () {
    // 引入弹出层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    // 拿到点击的那个编辑按钮身上的 data-id 属性值
    const id = $(this).attr('data-id')
    // 向接口发请求
    $.ajax({
      type: 'GET',
      url: '/my/article/cates/' + id,
      success(res) {
        // 拿到发送的id对应的数据，赋值给编辑表单,此时的隐藏input也有了id，只不过看不到
        form.val('form-edit', res.data)
      }
    })
  })

  // 编辑功能确认修改事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    // 向接口发请求，参数就是表单内的值
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      // 表单内的隐藏input有id，只是看不见而已
      data: $(this).serialize(),
      success(res){
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败')
        }
        layer.msg('更新分类数据成功')
        // 关闭修改弹出层，并且刷新页面
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  // 删除按钮点击事件
  $('body').on('click','.btn-delete',function(){
    // 拿到删除按钮身上的 data-id 属性值
    const id = $(this).attr('data-id')
    // 引入弹出层
    layer.confirm('确认要删除吗?', {icon: 3, title:'提示'}, function(index){
      // 发送请求
    $.ajax({
      type:'GET',
      // 地址加上对应的id
      url:'/my/article/deletecate/' + id,
      success(res){
        if (res.status !== 0) {
          return layer.msg('删除分类失败')
        }
        // 提示信息；关闭弹出层；渲染页面
        layer.msg('删除分类成功')
        layer.close(index)
        initArtCateList()
      }
    })      
    })
  })
  
})