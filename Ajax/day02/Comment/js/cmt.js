function getCommentList () {
  $.ajax({
    method: 'GET',
    url: 'http://www.liulongbin.top:3006/api/cmtlist',
    success: function (res) {
      if (res.status !== 200) return alert('获取评论列表失败！');
      let str = res.data.map(item => {
        return `<li class="list-group-item">
          <span class="badge" style="background-color: #F0AD4E;">评论时间：'${item.time}'</span>
          <span class="badge" style="background-color: #5BC0DE;">评论人：'${item.username}'</span>'${item.content}'
        </li>`
      }).join('');
      $('#cmt-list').html(str);
    }
  })
}
getCommentList();
$(function () {
  $('#formAddCmt').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.post("http://www.liulongbin.top:3006/api/addcmt", data, function (res) {
      if (res.status !== 201) return alert('发表失败！')
      getCommentList();
      $('#formAddCmt')[0].reset()
    }
    );
  })
})