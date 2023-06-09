
 function setTitle(title) {
  document.title = title;
}

//获取url上的参数值 e为参数名称
 function getQueryString(e) {
  var t = new RegExp('(^|/?|&)' + e + '=([^&]*)(&|$)');
  var a = window.location.search.substr(1).match(t);
  if (a != null) return a[2];
  return '';
}
//获取Cookie值 e为cookie的名 例如key
 function getCookie(e) {
  var t = document.cookie;
  var a = t.split('; ');
  for (var n = 0; n < a.length; n++) {
    var r = a[n].split('=');
    if (r[0] === e) return unescape(r[1]);
  }
  return null;
}
 function addCookie(e, t, a) {
  var n = e + '=' + escape(t) + '; path=/';
  if (a > 0) {
    var r = new Date();
    r.setTime(r.getTime() + a * 3600 * 1e3);
    n = n + ';expires=' + r.toGMTString();
  }
  document.cookie = n;
}
//删除Cookie
 function delCookie(e) {
  const t = new Date();
  t.setTime(t.getTime() - 1);
  const a = getCookie(e);
  if (a != null)
    document.cookie = e + '=' + a + '; path=/;expires=' + t.toGMTString();
}

//添加Session
 function addSession(key, value) {
  return sessionStorage.setItem(key, value);
}
// 获取Session
 function getSession(key) {
  return sessionStorage.getItem(key);
}
// 删除Session
 function delSession(key) {
  return sessionStorage.removeItem(key);
}
// 添加本地存储
 function addStorage(key, value) {
  localStorage.setItem(key, value);
}
// 获取本地存储
 function getStorage(key) {
  return localStorage.getItem(key);
}
// 删除本地存储指定的值
 function deloneStorage(key) {
  localStorage.removeItem(key);
}
// 删除所有本地存储的值
 function delAllStorage() {
  localStorage.clear();
}
// JSON数据转换 url后的参数格式
 function jsonurldata(datas) {
  const dataarray = [];
  const datakeys = Array.from(Object.keys(datas));
  const datavalue = Array.from(Object.values(datas));
  for (let i in datakeys) {
    let jsontostring = datakeys[i] + '=' + datavalue[i];
    dataarray.push(jsontostring);
  }
  let outdata = dataarray.join('&');
  return outdata;
}



 function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
// 压缩图片
 function canvasfn(imgsrc, truewidth, trueheight, is_cut) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const cts = canvas.getContext('2d');
    const newimg = new Image();
    newimg.src = imgsrc;
    newimg.onload = function () {
      let _w = newimg.naturalWidth;
      let _h = newimg.naturalHeight;
      if (is_cut) {
        canvas.width = truewidth;
        canvas.height = trueheight;
        if (_w > _h) {
          const x =
            Number(_w - truewidth) > 0
              ? Number(_w - truewidth) / 2
              : Number(truewidth - _w) / 2;
          const dw = (truewidth * _h) / _w;
          cts.drawImage(newimg, x, 0, dw, _h, 0, 0, truewidth, trueheight);
        } else {
          const dh = (trueheight * _w) / _h;
          const y =
            Number(_h - trueheight) > 0
              ? Number(_h - trueheight) / 2
              : Number(trueheight - _h) / 2;
          cts.drawImage(newimg, 0, y, _w, dh, 0, 0, truewidth, trueheight);
        }
        resolve(canvas.toDataURL('images/png', 1));
      } else {
        if (trueheight && trueheight !== '') {
          canvas.width = truewidth;
          canvas.height = trueheight;
          if (_w > _h) {
            const x =
              Number(_w - truewidth) > 0
                ? Number(_w - truewidth) / 2
                : Number(truewidth - _w) / 2;
            cts.drawImage(
              newimg,
              x,
              0,
              truewidth,
              _h,
              0,
              0,
              truewidth,
              trueheight,
            );
          } else {
            const y =
              Number(_h - trueheight) > 0
                ? Number(_h - trueheight) / 2
                : Number(trueheight - _h) / 2;
            cts.drawImage(
              newimg,
              0,
              y,
              _w,
              trueheight,
              0,
              0,
              truewidth,
              trueheight,
            );
          }
          resolve(canvas.toDataURL('images/png', 1));
        } else {
          let trueheight = (_h / _w) * truewidth;
          canvas.width = truewidth;
          canvas.height = trueheight;
          cts.drawImage(newimg, 0, 0, _w, _h, 0, 0, truewidth, trueheight);
          resolve(canvas.toDataURL('images/png', 1));
        }
      }
    };
  });
}


 function html_encode(str) {
  var s = '';
  if (str.length === 0) return '';
  s = str.replace(/&/g, '&gt;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/ /g, '&nbsp;');
  s = s.replace(/\'/g, '&#39;');
  s = s.replace(/\"/g, '&quot;');
  s = s.replace(/\n/g, '<br>');
  return s;
}
 function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
 function html_format(str) {
  var s = '';
  if (str.length == 0) return '';
  if (typeof str == 'number') {
    return String(str);
  }
  s = str.replace(/<br>/g, '');
  s = s.replace(/<br.*?\/>/g, '');
  s = s.replace(/<p.*?>/g, '');
  s = s.replace(/<\/p>/g, '');
  s = s.replace(/<img.*?\/>/g, '');
  s = s.replace(/<img.*?>/g, '');
  s = s.replace(/<h5>/g, '');
  s = s.replace(/<\/h5>/g, '');
  s = s.replace(/<h1>/g, '');
  s = s.replace(/<\/h1>/g, '');
  s = s.replace(/<h2>/g, '');
  s = s.replace(/<\/h2>/g, '');
  s = s.replace(/<h3>/g, '');
  s = s.replace(/<\/h3>/g, '');
  s = s.replace(/<h4>/g, '');
  s = s.replace(/<\/h4>/g, '');
  return s;
}

 function html_decode(str) {
  var s = '';
  if (!str || Array.from(str).length === 0) return '';
  s = str.replace(/&gt;/g, '&');
  s = s.replace(/&lt;/g, '<');
  s = s.replace(/&gt;/g, '>');
  s = s.replace(/&nbsp;/g, ' ');
  s = s.replace(/&#39;/g, "'");
  s = s.replace(/&quot;/g, '"');
  s = s.replace(/<br>/g, '\n');
  return s;
}
 function backtop() {
  window.scrollTo(0, 0);
}

 function isMobile() {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
    )
  ) {
    /*window.location.href="你的手机版地址";*/
    return true;
  } else {
    /*window.location.href="你的电脑版地址";    */
    return false;
  }
}

 function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lnglat = [position.coords.longitude, position.coords.latitude];
        resolve(lnglat);
      });
    } else {
      reject('定位失败');
    }
  });
}

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
function isUrl(route) {
  return reg.test(route);
}

 function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { route } = item;
    if (isUrl(route)) {
      route = parentPath + item.route;
    }
    const result = {
      ...item,
      route,
      authority: item.authority || parentAuthority,
    };
    if (item.child) {
      result.child = formatter(
        item.child,
        `${parentPath}${item.path}/`,
        item.authority,
      );
    }
    return result;
  });
}

 function getTitle(pathname, menu) {
  const newmune = formatter(menu);
  let selemune = null;
  if (pathname && pathname != '' && pathname != '/') {
    newmune.map((m) => {
      if (m.child) {
        const findresult = m.child.find((h) => {
          return (
            h.route.indexOf(pathname) > -1 || pathname.indexOf(h.route) > -1
          );
        });
        if (findresult) {
          selemune = findresult;
        } else {
          m.child.map((c) => {
            if (c.child) {
              const findresult2 = c.child.find((h) => {
                return (
                  h.route.indexOf(pathname) > -1 ||
                  pathname.indexOf(h.route) > -1
                );
              });
              if (findresult2) {
                selemune = findresult2;
              }
            }
          });
        }
      } else {
        if (m.route == pathname) {
          return m.name;
        }
      }
    });
    if (selemune) {
      return selemune.name;
    }
    return null;
  } else {
    return '首页';
  }
}

 function isIos() {
  if (navigator.userAgent.match(/iPhone/)) {
    return true;
  } else {
    return false;
  }
}

 function Difference(arr2, arr3) {
  return arr2.concat(arr3).filter(function (v) {
    return arr2.indexOf(v) === -1 || arr3.indexOf(v) === -1;
  });
}


export default {formatter,Difference,isIos,getQueryString,addCookie,getCookie,delCookie,isWeiXin,addSession,getSession,delSession,addStorage,getStorage,deloneStorage,delAllStorage,jsonurldata,canvasfn,html_decode,html_encode,html_format,getScrollTop,isMobile,getLocation,getTitle};
