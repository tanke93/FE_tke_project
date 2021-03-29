$(function () {
  resetui();
  $('.input_sub').on('click', function () {
    let input_value = $('.input_txt').val().trim();
    if (input_value.length <= 0) {
      return $('.input_txt').val('')
    }
    $('.talk_list').append(`<li class="right_word">
      <img src="img/person02.png" /> <span>${input_value}</span>
    </li>`
    );
    $('.input_txt').val('');
    resetui();
    getMsg(input_value)
  });

  function getMsg (text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success: function (res) {
        if (res.message === 'success') {
          let msg = res.data.info.text;
          $('.talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>');
          resetui();
          getVoice(msg);
        }
      }
    })
  }
  function getVoice (text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        if (res.status === 200) {
          $('#voice').attr('src', res.voiceUrl);
        }
      }
    })
  }

  $('.input_txt').on('keyup', function (e) {
    if (e.keyCode == 13) {
      $('.input_sub').click();//手动调用发送点击事件
    }
  })
})