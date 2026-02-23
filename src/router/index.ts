import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 引入对应的视图组件
import Home from '../views/Home.vue'
import ScoreQuery from '../views/ScoreQuery.vue'

// 使用 RouteRecordRaw 规范路由对象类型
const routes: Array<RouteRecordRaw> = [
  {
    path: '/apply/cjcx/',
    name: 'Home',
    component: Home
  },
  {
    // 动态路由，使用 :file 匹配类似 10003.dhtml 的后缀
    path: '/apply/cjcx/t/:file',
    name: 'ScoreQuery',
    component: ScoreQuery
  },
  {
    // 根目录重定向到成绩查询首页
    path: '/',
    redirect: '/apply/cjcx/'
  }
]

const router = createRouter({
  // 使用 HTML5 History 模式
  history: createWebHistory(),
  routes
})

export default router