/**
 * Created by weihanwei on 2017/3/14.
 */
let Edit = (function () {
  let acen_edit = ace.edit('mdeditor');
  acen_edit.setTheme('ace/theme/chrome');
  acen_edit.getSession().setMode('ace/mode/markdown');
  acen_edit.renderer.setShowPrintMargin(false);
  let FuncData = {
    bold: '**?**',
    italic: '*?*',
    strikethrough: '~~?~~',
    underline: '<font style="text-decoration: underline">?</font>',
    color: '<font color="red">?</font>',
    quote: '\n> ',
    splitLine: '\n---\n',
    listUl: '\n- \n- ',
    listOl: '\n1. \n2. ',
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
  if (isS(GLOBAL._id)) {
    acen_edit.insert($('textarea.hidden').val());
    $("#preview").html(marked(acen_edit.getValue()));
    $('.create-title').val(GLOBAL.title);
  }
  return {
    insert: function (val) {
      val = FuncData[val];
      acen_edit.insert(val);
      $('.ace_text-input').focus();
    },
    getValue: function () {
      return {
        content: acen_edit.getValue(),
        title: $('.create-title').val()
      }
    }
  }
})();

$(function () {
  $("#mdeditor").keyup(function () {
    $("#preview").html(marked(Edit.getValue().content));
  });
  $('.md-func').click(function () {
    let name = $(this).attr('data-name');
    Edit.insert(name);
    $("#preview").html(marked(Edit.getValue()));
  });
  $('#createBtn').click(function () {
    let ajaxOption;
    let result = Edit.getValue();
    if (!isS(result.title) || result.title.length <= 0) {
      return Dialogs.showWarn("请填标题。");
    }
    if (!isS(result.content) || result.content.length <= 0) {
      return Dialogs.showWarn("请填文章内容。");
    }
    ajaxOption = {
      url: '/posts/creation',
      type : 'POST',
      data: result,
      dataType: 'json',
      success: function (data) {
        if (data.success != 1) {
          Dialogs.showWarn(data.msg);
        } else {
          window.location.href = '/';
        }
      }
    };
    if (isS(GLOBAL._id) && GLOBAL._id.length > 0) {
      ajaxOption.url += '/'+GLOBAL._id;
      ajaxOption.type = 'PUT';
    }
    $.ajax(ajaxOption);
  });
});
