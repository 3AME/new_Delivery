import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '配送查询',
    icon: 'fa fa-star',
    children: [
      { path: '/page_coordinate', icon: 'folder-o', title: '坐标查询' },
      { path: '/page2', icon: 'folder-o',title:  '路线查询' },
      { path: '/page_map',icon: 'folder-o',  title: '选择地图' },
      { path: '/page_history', icon: 'folder-o', title: '查询历史' }
    ]
  },
  {
    title: '关于',
    icon: 'folder-o',
    children: [
      { path: '/about', icon: 'folder-o', title: '关于我们' },
      { path: '/faq',icon: 'folder-o',  title: '常见问题' },
      { path: '/use',icon: 'folder-o', title: '使用手册' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '配送查询',
    icon: 'folder-o',
    children: [
      { path: '/page_coordinate', title: '坐标查询' },
      { path: '/page2', title: '路线查询' },
      { path: '/page_map', title: '选择地图' },
      { path: '/page_history', title: '查询历史' }
    ]
  },
  {
    title: '关于',
    icon: 'folder-o',
    children: [
      { path: '/about', title: '关于我们' },
      { path: '/faq', title: '常见问题' },
      { path: '/use', title: '使用手册' }
    ]
  }
])
