/**
 * Created by weihanwei on 2017/2/6.
 */
$(function () {
  $('#submit').click(function (event) {
    event.preventDefault();
    $('#infoForm').serializeArray();
    $.post('/signin', $('#infoForm').serializeArray(), data => {
      if (data.success != 1) {
        Dialogs.showWarn(data.msg);
      }
    }, "json");
  })
});