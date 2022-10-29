import axios from 'axios'
import config from '../config/index.js'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro // 调用开发与生产环境配置
//development：是webpack配置文件webpack.config.js中导出模块module.exports的一个对象中属性名叫mode的属性值，代表开发模式
//production：也是webpack配置文件webpack.config.js中导出模块module.exports的一个对象中属性名叫mode的属性值，代表生产模式（也叫线上模式）
//process.env.NODE_ENV 可以获取到当前的代码的运行环境
class HttpRequest {
  // 将axios抽象成工具类
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  // 对象的constructor属性用于返回创建该对象的函数，也就是我们常说的构造函数
  getInsideConfig() {
    // 基础请求的配置方法
    const config = {
      //// 这里我们配置好请求的基础设置，服务端需要的请求头等
      baseUrl: this.baseUrl, // 请求的url信息
      header: {}, // 请求头的信息
    }

    return config
  }
  interceptors(instance) {
    // 拦截器
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        console.log(response, 'response')
        // 对响应数据做点什么
        return response
      },
      function (error) {
        // 对响应错误做点什么
        console.log(error, 'error')
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    // 结合以上方法创建axios实例，并返回请求实例
    const instance = axios.create()
    options = { ...this.getInsideConfig(), ...options } // 对传入的对象进行解构  对axios简单的二次封装
    this.interceptors(instance) // 调用拦截器
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)
