import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
//引入存储的假数据地址
import userApi from './mockServeData/user.js'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)
