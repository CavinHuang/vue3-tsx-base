import Layout from '@/views/layout/default'

export default [
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/index',
    meta: {
      title: '首页',
      icon: 'icon-app'
    },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        meta: { title: '首页' },
        component: () => import('@/views/home')
      }
    ]
  }
]
