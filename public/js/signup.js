/**
 * Created by weihanwei on 2017/2/6.
 */
function checkUserData () {
  let data = $('#infoForm').serializeArray();
  let result = {};
  data.forEach(function(item) {
    result[item.name] = item.value;
  });
  result.imgURL = $('#file').val();
  console.log(result);

  if (!isS(result.username) || result.username.length <= 0) {
    return Dialogs.showWarn("请填写用户名。");
  }
  if (isS(Validate.text(result.password, 16))) {
    return Dialogs.showWarn("密码长度应为16位以内。")
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
}

$(function(){
  $('#username').change(function(){
    let val = $(this).val();
    let result = Validate.text(val, 16);
    if(isS(result)) {
     $(this).val(result);
     return
    }
    $.getJSON("/signup/" + val, function(data){
      if(data.success != 1) {
        Dialogs.showWarn(data.msg);
      }
    })
  });
  $('#submit').click(function(event){
    event.preventDefault();
    if(!checkUserData()) return;
    var formdata = new FormData($('#infoForm')[0]);
    $.ajax({
      url: '/signup',
      type: 'post',
      data: formdata,
      processData : false,
      contentType : false,
      dataType: 'text',
      success: function(str){
        console.log(str);
      }
    });
  });
});