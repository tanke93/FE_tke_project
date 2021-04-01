$(function () {
  $('#searchBtn').click(function () {
    var phoneInputValue = $.trim($('#phoneInput').val());
    if (phoneInputValue === '') return alert('请输入手机号码');
    if (!/^1[35789]\d{9}$/.test(phoneInputValue)) return alert('手机号格式不正确');
    $.ajax({
      method: 'GET',
      url: `http://apis.juhe.cn/mobile/get?phone=${phoneInputValue}&key=9e76dcf7eb24cd3a070a80f6e912c780`,
      dataType: 'jsonp',
      success: function (res) {
        if (res.error_code === 0) {
          $('#phone').text(phoneInputValue);
          $('#addr').text(res.result.province + ' ' + res.result.city);
          $('#company').text(res.result.company);
          $('#areacode').text(res.result.areacode);
          $('#zip').text(res.result.zip);
          alert('查询成功');
        }
      }
    })
  })
})
