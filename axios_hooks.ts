import { useState, useEffect, useReducer } from 'react';
import axios, * as defaultAxios from 'axios';
import { getStorage, deloneStorage } from './commont';
import { initialResponse, responseReducer, actions } from './reducers';
import { message } from 'antd';
import { history } from 'umi';
/**
 * Params
 * @param  {AxiosInstance} axios - (optional) The custom axios instance
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [forceDispatchEffect=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, response) => {}] - (optional) Custom handler callback, NOTE: `error` and `response` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} reFetch - MANUAL RUN trigger function for making a request manually
 */

const { CancelToken, isCancel }: any = defaultAxios;
const _Object: any = Object;
const _window: any = window;

export default ({
  url,
  method = 'post',
  data = {},
  trigger,
  filter,
  forceDispatchEffect,
  customHandler,
}: any = {}) => {
  const [results, dispatch] = useReducer(responseReducer, initialResponse);
  const [innerTrigger, setInnerTrigger] = useState(0);

  let outerTrigger = trigger;
  try {
    outerTrigger = JSON.stringify(trigger);
  } catch (err) {
    //
  }
  const params: any = new FormData();
  const dispatchEffect = forceDispatchEffect || filter || (() => true);

  const handler: any = (error: any, response: any, data: any) => {
    if (customHandler) {
      customHandler(error, data, response);
    }
  };
  let axioshooks: any = axios.create();
  let config: any = {};
  const token = getStorage('token');
  const source = CancelToken.source();
  if (token) {
    config = {
      headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
      cancelToken: source.token,
    }; //添加请求头
  }
  if (method && method == 'get') {
    config.headers = {
      Authorization: token,
      cancelToken: source.token,
    };
    axioshooks = axios.get;
  } else if (method && method == 'file') {
    config.headers = {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
      Accept: '*/*',
    };
    axioshooks = axios.post;
  } else {
    axioshooks = axios.post;
  }
  useEffect(() => {
    if (!url || !dispatchEffect()) return;
    // ONLY trigger by query
    if (outerTrigger && !innerTrigger) {
      return;
    }

    handler(null, null);
    dispatch({ type: actions.init });

    let paramsdata: any = null;
    if (data) {
      if (method && method == 'file') {
        _Object.values(data).map((d: any, index: any) => {
          if ((d && d != '') || typeof d == 'number') {
            if (Object.keys(data)[index] == 'file') {
              params.append('file', d, d.name);
            } else {
              params.append(Object.keys(data)[index], d);
            }
          }
        });
        paramsdata = params;
      } else if (method && method == 'get') {
        const getmethoddata: any = {};
        _Object.values(data).map((h: any, index: any) => {
          if ((h && h != '') || typeof h == 'number') {
            getmethoddata[Object.keys(data)[index]] = h;
          }
        });
        paramsdata = { params: getmethoddata };
      } else {
        if (data && data != '' && parse_param) {
          data = parse_param(data);
        }

        for (const p in data) {
          if (!data[p]) {
            data[p] = '';
          }
          if (data[p]) {
            params.append(p, data[p]);
          }
        }

        paramsdata = params;
      }
    }
    let newurl: any = '';
    if (/http/.test(url)) {
      newurl = url;
    } else {
      newurl = _window.config.indexurl + url;
    }
    axioshooks(newurl, paramsdata, config)
      .then((response: any) => {
        console.log(response, 'response');
        if (response.data.code == 400) {
          if (response.data.error && response.data.error.login&& response.data.error.login==1) {
            deloneStorage('token');
            history.push('/login.html');
          } else if (
            response.data.error == 'token失效' ||
            response.data.error == 'token not found'
          ) {
            deloneStorage('token');
            history.push('/login.html');
          } else {
            handler(null, response, response.data);
            dispatch({ type: actions.fail, payload: response });
          }
        } else {
          if (response.data) {
            handler(null, response, response.data);
            dispatch({ type: actions.success, payload: response });
          } else {
            message.error('服务器数据为空');
          }
        }
      })
      .catch((error: any) => {
        handler(error, null);
        if (!isCancel(error)) {
          dispatch({ type: actions.fail, payload: error });
        }
      });

    return () => {
      source.cancel();
    };
  }, [innerTrigger, outerTrigger]);

  return {
    ...results,
    // @deprecated
    query: () => {
      setInnerTrigger(+new Date());
    },
    reFetch: () => {
      setInnerTrigger(+new Date());
    },
  };
};

const parse_param = function (param: any = {}, pre_k: any = '') {
  const rs: any = {};
  for (let p in param) {
    if (!param[p]) {
      if (pre_k != '') {
        rs[pre_k + '[' + p + ']'] = '';
      } else {
        rs[p] = '';
      }
    } else if (typeof param[p] === 'object') {
      const pk = pre_k != '' ? pre_k + '[' + p + ']' : p;
      Object.assign(rs, parse_param(param[p], pk));
      delete param[p];
    } else {
      if (pre_k != '') {
        rs[pre_k + '[' + p + ']'] = param[p];
      } else {
        rs[p] = param[p];
      }
    }
  }
  return rs;
};
