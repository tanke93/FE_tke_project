$(function () {
  // 补零
  function padZero (n) {
    return n.toString().padStart(2, 0)
  }
  //时间过滤器
  template.defaults.imports.dateFormat = function (str) {
    let dt = new Date(str);

    let y = dt.getFullYear();
    let m = padZero(dt.getMonth() + 1);
    let d = padZero(dt.getDate());

    let hh = padZero(dt.getHours());
    let mm = padZero(dt.getMinutes());
    let ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  //获取新闻列表函数
  function getNewsList () {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/news',
      success: function (res) {
        if (res.status !== 200) return alert('获取新闻列表数据失败！')
        res.data.forEach((item, i) => {
          res.data[i].tags = res.data[i].tags.split(',')
        });
        var htmlStr = template('tpl-news', res);
        $('#news-list').html(htmlStr)
      }
    })
  }
  getNewsList();
})