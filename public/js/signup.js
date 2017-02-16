/**
 * Created by weihanwei on 2017/2/6.
 */
$(function(){
  $('#username').change(function(){
    $.getJSON("/signup/" + $(this).val(), function(data){
      if(data.success != 1) {
        Dialogs.showWarn(data.msg);
      }
    })
  });
  $('#submit').click(function(event){
    event.preventDefault();
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