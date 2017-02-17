/**
 * Created by weihanwei on 2017/2/17.
 */
Validate = {
  toString : Object.prototype.toString,
  file: function(v, arr){
    let flag = false;
    let strTemp = v.split(".");
    let strCheck = strTemp[strTemp.length - 1].toLowerCase();
    for(let i = 0, len = arr.length; i < len; i++) {
      if(strCheck == arr[i]) {
        flag = true;
        break;
      }
    }
    return flag;
  },
  text: function (v, max) {
    if(v.length > max) {
      return v.slice(0, max);
    } else {
      return true;
    }
  },
  number: function (v, max) {

  },
  itemEquals: function (item, item, flag) {
    if(flag) {
      return item === item;
    } else {
      return item == item;
    }
  }
  ,
  isN: function (v) {
    return typeof v === 'number' && isFinite(v);
  },
  isS: function (v) {
    return typeof v === 'string';
  },
  isB: function (v) {
    return typeof v === 'boolean';
  }
};

window.isN = Validate.isN;
window.isS = Validate.isS;
window.isB = Validate.isB;