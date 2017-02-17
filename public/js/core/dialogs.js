/**
 * Created by weihanwei on 2017/2/17.
 */
Dialogs = {
  showWarn: function(msg, title){
    var title = title;
    if(!msg) {
      return
    }
    if(!title) {
      title = '系统提示';
    }
    $('#globalModal .modal-title').text(title);
    $('#globalModal .modal-body > p').text(msg);
    $('#globalModal').modal('show');
  }
};