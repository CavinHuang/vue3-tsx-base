/**
 * 音乐相关的路径
 */
import Layout from '@/views/layout/default'

export default [
  {
    name: 'MusiceIndex',
    path: '/music',
    redirect: '/music/index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'icon-app',
      keepalive: true
    },
    children: [
      {
        path: 'index',
        name: 'MusiceList',
        meta: { title: '音乐首页' },
        component: () => import('@/views/music')
      }
    ]
  }
]
