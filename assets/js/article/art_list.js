$(function () {
  const layer = layui.layer
  const form = layui.form
  const laypage = layui.laypage

  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)

    const y = dt.getFullYear()
    const m = padZero(dt.getMonth() + 1)
    const d = padZero(dt.getDate())
    const hh = padZero(dt.getHours())
    const mm = padZero(dt.getMinutes())
    const ss = padZero(dt.getSeconds())

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  function padZero(n) {
    return n > 9 ? n : '0' + n
  }

  const q = {
    pagenum: 1, //当前页码值（表示当前是第几页）
    pagesize: 2, //当前每页显示多少条
    cate_id: '', //当前选择的文章分类
    state: '' //当前文章所处的状态，可选值：已发布，操作 都是字符串
  }

  initTable()
  initCate()
  function initTable() {
    $.ajax({
      type: 'GET',
      url: '/my/article/list',
      data: q,
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败')
        }
        const htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }


  function initCate() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败')
        }
        const htmlStr = template('tpl-cate', res)
        $('[name=cate_id]').html(htmlStr)
        form.render()
      }
    })
  }

  $('#form-search').on('submit', function (e) {
    e.preventDefault()
    const cate_id = $('[name=cate_id]').val()
    const state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })

  function renderPage(total) {
    laypage.render({
      elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
      count: 7,//数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          initTable()
        }
      }
    })
  }

  $('tbody').on('click', '.btn-delete', function () {
    const id = $(this).attr('data-id')
    layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
      const len = $('.btn-delete').length
      
      
      $.ajax({
        type: 'GET',
        url: `/my/article/delete/${id}`,
        success(res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败')
          }
          console.log(res)
          layer.msg('删除文章成功')
          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          initTable()
        }
      })

      layer.close(index);
    })
  })
})