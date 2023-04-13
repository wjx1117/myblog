import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)
// 执行use,vue底层执行Vuex.install方法

// 2. 创建对象
// 使用Vuex的Store类
const store = new Vuex.Store({
  state: {  
    id : '',
    account : '',
    token : '',
    serve_url : 'http://localhost:8080'  // 服务端地址
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})

// 3. 导出store对象
export default store