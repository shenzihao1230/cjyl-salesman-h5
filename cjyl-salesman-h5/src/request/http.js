/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
// import store from '../store/state';
import {
  Message
} from 'element-ui';
import router from '../router';

// 环境的切换
//if (location.hostname === 'localhost') {
//	axios.defaults.baseURL = process.env.API_PATH_DEV
//} else if (location.hostname === 'dev_wd.ihibuilding.cn') {
//	axios.defaults.baseURL = process.env.API_PATH_DEV
//} else if (location.hostname === 'test_wd.ihibuilding.cn') {
//	axios.defaults.baseURL = process.env.API_PATH_TEST
//} else if (location.hostname === 'wd.hibuilding.cn') {
//	axios.defaults.baseURL = process.env.API_PATH_PROD
//}
//NODE_ENV
let url = location.href
if(url.indexOf("manager") != -1){
  url = url.split("manager")[0];
}
if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = 'http://220.189.227.170:1280/yimilk-web/cms' // 道霆测试服务器
  // axios.defaults.baseURL = 'http://192.168.1.:8002/cms'
} else if(process.env.NODE_APP_ENV === 'test'){
  axios.defaults.baseURL = 'http://apptest.96211.net:1280/yimilk-web/cms'
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://smartpay.96211.net/yimilk-web/cms' //一景正式服务器
  // axios.defaults.baseURL = 'http://apptest.96211.net:1280/yimilk-web/cms' //一景测式服务器
  // axios.defaults.baseURL = 'http://220.189.227.170:1280/yimilk-web/cms' // 道霆测试服务器
  // axios.defaults.baseURL = 'http://192.168.1.165:80/cms'   // 郭金金服务器
  // axios.defaults.baseURL = 'http://192.168.1.99:80/cms' 		//龚  服务器
  // axios.defaults.baseURL = 'http://192.168.1.68:80/cms'//袁瑞 服务器
  // axios.defaults.baseURL = `${url}yimilk-web/cms`
}
// console.log(sessionStorage.user,'59595959')
//

// 请求超时时间
axios.defaults.timeout = 600000;
// axios.defaults.withCredentials = true;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.withCredentials = true
// 重复请求的拦截
let pending = [] //用于存储每个请求的取消函数和axios标识
let CancelToken = axios.CancelToken
let cancelPending = (config) => {
  pending.forEach((item, index) => {
    if (config) {
      if (item.UrlPath === config.url) {
        item.Cancel() // 取消请求
        pending.splice(index, 1) // 移除当前请求记录
      }
    }
    // else {
    //   item.Cancel() // 取消请求
    //   pending.splice(index, 1) // 移除当前请求记录
    // }
  })
}


// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = sessionStorage.getItem('token');
    // const sid=sessionStorage.getItem('sid');
    // token && (config.headers.token= token);
    // sid && (config.headers.sid= sid);
    cancelPending(config) //在一个axios发送前执行一下取消操作
    config.cancelToken = new CancelToken(res => { //请求config进行canceltoken的标识，与canceltoken 的赋值
      pending.push({
        'UrlPath': config.url,
        'Cancel': res
      })
    })
    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(response => {
  cancelPending(response.config) //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
  if (response && response.data.code) {
    if (response.data.code == 200) {
      return response;
    } else if (response.data.code == 202) {
      // router.replace({
      //   path: '/'
      // })
    } else {
      Message({
        message: response.data.message,
        type: 'warning'
      })
    }
  }
  return response;

}, error => {
  if (error.res) {
    // switch (error.res.data.code) {
    // 	// 未登录则跳转登录页面，并携带当前页面的路径
    // 	// 在登录成功后返回当前页面，这一步需要在登录页操作。
    // 	case 90008:
    // 		router.replace({
    // 			path: '/',
    // 			query: {
    // 				redirect: router.currentRoute.fullPath
    // 			}
    // 		});
    // 		break;
    // 		// 403 token过期
    // 		// 登录过期对用户进行提示
    // 		// 清除本地token和清空vuex中token对象
    // 		// 跳转登录页面
    // 	case 9009:
    // 		Message({
    // 			message: '登录过期，请重新登录',
    // 			duration: 1000,
    // 			showClose: true,
    // 		});
    // 		// 清除token
    // 		sessionStorage.removeItem('token');
    // 		//  store.commit('loginSuccess', null);
    // 		// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
    // 		setTimeout(() => {
    // 			router.replace({
    // 				path: '/',
    // 				query: {
    // 					redirect: router.currentRoute.fullPath
    // 				}
    // 			});
    // 		}, 1000);
    // 		break;
    // 	default:
    // 		Message({
    // 			message: error.res.data.message,
    // 			duration: 1500,
    // 			showClose: true,
    // 		});
    // }
    return Promise.reject(error.response);
  }
});
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

 export function jsonPost(url, params) {
  // axios.headers['Content-Type'] = 'application/json;charset=utf-8';
  return new Promise((resolve, reject) => {
    axios.post(url, params , {'Content-Type': 'application/json;charset=utf-8'})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}



export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export function UploadFile(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
