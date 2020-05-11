import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'page_coordinate',
        name: 'page_coordinate',
        meta: {
          title: '坐标查询',
          auth: true
        },
        component: _import('demo/page_coordinate')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '路线查询',
          auth: true
        },
        component: _import('demo/page2')
      },
      {
        path: 'page_map',
        name: 'page_map',
        meta: {
          title: '地图选择',
          auth: true,
          keepAlive: true,
          cache: true
        },
        component: _import('demo/page_map')
      },
      {
        path: 'page_result',
        name: 'page_result',
        meta: {
          title: '结果显示',
          auth: true,
          keepAlive: true,
          cache: true
        },
        component: _import('demo/page_result')
      },
      {
        path: 'page_history',
        name: 'page_history',
        meta: {
          title: '历史记录',
          auth: true,
          keepAlive: true,
          cache: true
        },
        component: _import('demo/page_history')
      },
      {
        path: 'about',
        name: 'about',
        meta: {
          title: '关于我们',
          auth: true
        },
        component: () => import('../views/guan/about')
      },
      {
        path: 'faq',
        name: 'faq',
        meta: {
          title: '常见问题',
          auth: true
        },
        component: () => import('../views/guan/faq')
      },
      {
        path: 'use',
        name: 'use',
        meta: {
          title: '使用手册',
          auth: true
        },
        component: () => import('../views/guan/use')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
