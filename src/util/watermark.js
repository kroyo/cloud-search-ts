/* jshint esversion: 6 */
//水印方法
export function watermark(str, el) {
  let _del = document.querySelector('.watermask'),
    container = document.querySelector(el);
  if (!container) return;
  if (_del) {
    container.removeChild(_del);
  }
  let can = document.createElement('canvas');
  let mask_div = document.createElement('div');
  let _height = window.getComputedStyle(container).height;
  let strWidth;
  if (str.length <= 10) {
    strWidth = 200;
  } else if (str.length > 20) {
    strWidth = 400;
  } else if (str.length > 10) {
    strWidth = 280;
  }
  mask_div.className = 'watermask';
  mask_div.style.position = 'absolute';
  mask_div.style.top = '0';
  mask_div.style.left = '0';
  mask_div.style.right = '0';
  mask_div.style.height = _height;
  mask_div.style.zIndex = '1';
  mask_div.style.pointerEvents = 'none';
  mask_div.style.opacity = '.6';
  mask_div.appendChild(can);
  container.appendChild(mask_div);
  can.width = strWidth;
  can.height = 150;
  can.style.display = 'none';
  let cans = can.getContext('2d');
  cans.rotate(-18 * Math.PI / 180);
  cans.font = "16px 微软雅黑";
  cans.fillStyle = "rgba(17, 17, 17, 0.3)";
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(str, can.width / 100, can.height / 1);
  mask_div.style.backgroundImage = "url(" + can.toDataURL("image/png") + ")";
}

/**
   * keywords名称和id的互相转换
   * @param  {[string]} toType [转换成id:'toId',转换成name:'toName']
   * @param  {[string]} val    [转换前的id或name]
   * @return {[string]}        [转换后对应的id或name]
   */
export function keywordsChangeNameOrId(list, toType, val) {
  let result;
  if (toType === 'toId') {
    list.forEach((elem) => {
      if (elem.name === val) {
        result = elem.id;
      }
    });
  } else if (toType === 'toName') {
    list.forEach((elem) => {
      if (elem.id === val) {
        result = elem.name;
      }
    });
  } else if (toType === 'toType') {
    list.forEach((elem) => {
      if (elem.id === val) {
        result = elem.selType || null;
      }
    });
  }
  return result;
}

//深度查重
let toString = Object.prototype.toString;

export function eq(a, b, aStack, bStack) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  if (a == null || b == null) return false;
  if (a !== a) return b !== b;
  let type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
}

function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}

function deepEq(a, b, aStack, bStack) {
  let className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b;
    case '[object Number]':
      if (+a !== +a) return +b !== +b;
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
  }

  let areArrays = className === '[object Array]';
  // 不是数组
  if (!areArrays) {
    // 过滤掉两个函数的情况
    if (typeof a != 'object' || typeof b != 'object') return false;
    let aCtor = a.constructor,
      bCtor = b.constructor;
    // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
  }
  aStack = aStack || [];
  bStack = bStack || [];
  let length = aStack.length;
  // 检查是否有循环引用的部分
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }
  aStack.push(a);
  bStack.push(b);
  // 数组判断
  if (areArrays) {
    length = a.length;
    if (length !== b.length) return false;
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  }
  // 对象判断
  else {
    let keys = Object.keys(a),
      key;
    length = keys.length;
    if (Object.keys(b).length !== length) return false;
    while (length--) {
      key = keys[length];
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}