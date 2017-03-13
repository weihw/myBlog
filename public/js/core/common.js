/**
 * Created by weihanwei on 2/8/17.
 */
$(function () {
  // 登录
  $('#signinModal #signin').click(function (event) {
    event.preventDefault();
    $.post('/signin', $('#signinModal #infoForm').serializeArray(), data => {
      if (data.success != 1) {
        // $('#signinModal').modal('hide');
        Dialogs.showWarn(data.msg);
      } else {
        window.location.href = '/';
      }
    }, "json");
  });
  // 注册
  $('#signupModal #username').change(function () {
    let val = $(this).val();
    let result = Validate.text(val, 16);
    if (isS(result)) {
      $(this).val(result);
      return
    }
    $.getJSON("/signup/" + val, function (data) {
      if (data.success != 1) {
        Dialogs.showWarn(data.msg);
      }
    })
  });
  $('#signupModal #signup').click(function (event) {
    event.preventDefault();
    let checkUserData = function () {
      let data = $('#signupModal #infoForm').serializeArray();
      let result = {};
      data.forEach(function (item) {
        result[item.name] = item.value;
      });
      result.imgURL = $('#signupModal #file').val();
      console.log(result);

      if (!isS(result.username) || result.username.length <= 0) {
        return Dialogs.showWarn("请填写用户名。");
      }
      if (isS(Validate.text(result.password, 16))) {
        return Dialogs.showWarn("密码长度应为16位以内。");
      }
      if (result.password !== result.repassword) {
        return Dialogs.showWarn("密码不一致。");
      }
      if (!isS(result.imgURL) || !result.imgURL.length > 0 || !Validate.file(result.imgURL, ['jpg', 'jpeg', 'png'])) {
        return Dialogs.showWarn("请上传图片格式文件。");
      }
      if (!isS(result.sex)) {
        return Dialogs.showWarn("请选择性别。");
      }
      return true;
    };
    if (!checkUserData()) return;
    let formdata = new FormData($('#signupModal #infoForm')[0]);
    $.ajax({
      url: '/signup',
      type: 'post',
      data: formdata,
      processData: false,
      contentType: false,
      dataType: 'text',
      success: function (data) {
        if (data.success != 1) {
          Dialogs.showWarn(data.msg);
        } else {
          window.location.href = '/';
        }
      }
    });
  });

  $('.modal .modalClose').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    let $modal = $(this).closest('.modal');
    let $inputs = $(this).closest('.modal').find('input');
    for (let i = 0, len = $inputs.length; i < len; i++) {
      $inputs[i].value = '';
    }
    $modal.modal('hide');
  });
});

