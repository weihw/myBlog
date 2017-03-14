/**
 * Created by weihanwei on 2017/3/14.
 */
let Edit = (function() {
  let acen_edit = ace.edit('mdeditor');
  acen_edit.setTheme('ace/theme/chrome');
  acen_edit.getSession().setMode('ace/mode/markdown');
  acen_edit.renderer.setShowPrintMargin(false);
  let FuncData = {
    bold: '**?**',
    italic: '*?*',
    strikethrough: '~~?~~',
    underline: '<font style="text-decoration: underline"></font>',
    color: '<font color="red"></font>',
    quote: '\n> ',
    splitLine: '\n---\n',
    listUl: '\n- \n- ',
    listOl : '\n1. \n2. ',
    code: '\n```\n```',
    link: '[京东](http://www.jd.com)',
    image: '![image](http://www.360buy.com/favicon.ico)',
    h1: '# ',
    h2: '## ',
    h3: '### ',
    h4: '#### ',
    h5: '##### ',
    h6: '###### ',
    table: '\n\rheader 1 | header 2\r\n---|---\r\nrow 1 col 1 | row 1 col 2\r\nrow 2 col 1 | row 2 col 2'
  };
  return {
    insert: function(val){
      val = FuncData[val];
      acen_edit.insert(val);
      $('.ace_text-input').focus();
    },
    getValue: function () {
      return acen_edit.getValue()
    }
  }
})();

$(function () {
  $("#mdeditor").keyup(function() {
    $("#preview").html(marked(Edit.getValue()));
  });
  $('.md-func').click(function () {
    let name = $(this).attr('data-name');
    Edit.insert(name);
    $("#preview").html(marked(Edit.getValue()));
  });
  $('#createBtn').click(function () {
    let result = {
      content: marked(Edit.getValue()),
      title: $('.create-title').val()
    };
    if(!isS(result.title) || result.title.length <= 0) {
      return Dialogs.showWarn("请填标题。");
    }
    if(!isS(result.content) || result.content.length <= 0) {
      return Dialogs.showWarn("请填文章内容。");
    }
    $.post('/posts/create', result,function (data) {
      if (data.success != 1) {
        Dialogs.showWarn(data.msg);
      } else {
        window.location.href = '/';
      }
    });
  })
});
