import Vue from 'vue'
import Router from 'vue-router'

// 懒加载
const Test = () => import('../views/Test')
const Login = () => import('../views/Login')
const Dashboard = () => import('../views/dashboard/Dashboard')
const Article = () => import('../views/dashboard/Article')
const Category = () => import('../views/dashboard/Category')
const HomePage = () => import('../views/HomePage')
const dd = () => import('../views/dd')

// 1. 安装插件
Vue.use(Router)

// 2，创建路由对象
const routes = [
  {
    path : '/',
    // redirect : '/homepage'
    redirect : '/dd'
  },
  {
    path : '/dd',
    component : dd
  },
  {
    path : '/test',
    component : Test
  },
  {
    path : '/login',
    component : Login
  },
  {
    path : '/homepage',
    component : HomePage
  },
  {
    path : '/dashboard',
    component : Dashboard,
    children : [
      {
        path : 'article',
        component : Article
      },
      {
        path : 'category',
        component : Category
      }
    ]
  }
]
const router = new Router({
  routes,
  mode : 'history'
})

// 3. 导出router
export default router