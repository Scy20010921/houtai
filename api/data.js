import axios from './axios'
// 后续接口都写在data中

export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param,
    //param 传递的一个参数 对象
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    //param 传递的一个参数 对象
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params,
  })
}
