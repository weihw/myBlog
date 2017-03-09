/**
 * Created by weihanwei on 2017/2/17.
 */
const Dialogs = {
  showWarn: (msg, title) => {
    if (!msg) {
      return
    }
    if (!title) {
      title = '系统提示';
    }
    $('#globalModal .modal-title').text(title);
    $('#globalModal .modal-body > p').text(msg);
    $('#globalModal').modal('show');
  }
};