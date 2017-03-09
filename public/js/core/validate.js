/**
 * Created by weihanwei on 2017/2/17.
 */
const Validate = {
  toString: Object.prototype.toString,
  file: (v, arr) => {
    let flag = false;
    let strTemp = v.split(".");
    let strCheck = strTemp[strTemp.length - 1].toLowerCase();
    for (let i = 0, len = arr.length; i < len; i++) {
      if (strCheck == arr[i]) {
        flag = true;
        break;
      }
    }
    return flag;
  },
  text: (v, max) => {
    if (v.length > max) {
      return v.slice(0, max);
    } else {
      return true;
    }
  },
  number: (v, max) => {

  },
  itemEquals: (baseItem, otherItem, flag) => {
    if (flag) {
      return item === item;
    } else {
      return item == item;
    }
  },
  isN: v => typeof v === 'number' && isFinite(v),
  isS: v => typeof v === 'string',
  isB: v => typeof v === 'boolean'
};

window.isN = Validate.isN;
window.isS = Validate.isS;
window.isB = Validate.isB;