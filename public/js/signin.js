/**
 * Created by weihanwei on 2017/2/6.
 */
$(function () {
  $('#submit').click(function (event){
    event.preventDefault();
    var formdata = new FormData($('#infoForm')[0]);
    $.ajax({
      url: '/signin',
      type: 'post',
      data: formdata,
      processData: false,
      contentType: false,
      dataType: 'text',
      success: function (str){
        console.log(str);
      }
    })
  })
});