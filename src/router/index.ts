import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'login',
			path: '/login',
			component: () => import('@/views/Login/index.vue')
		},
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/Home/index.vue'),
			meta: {
				title: '进出记录',
				requiresAuth: true
			}
		},
		{
			name: 'children',
			path: '/children',
			component: () => import('@/views/Mine/index.vue'),
			meta: {
				title: '个人主页',
				requiresAuth: true
			}
		},
		{
			name: 'bindChild',
			path: '/bindChild',
			component: () => import('@/views/BindChild/index.vue'),
			meta: {
				title: '添加监视人',
				requiresAuth: true
			}
		},
		{
			path: '/403',
			name: '403',
			component: () => import('@/components/ErrorMessage/403.vue'),
			meta: {
				title: '无权限访问',
				requiresAuth: true
			}
		},
		{
			path: '/404',
			name: '404',
			component: () => import('@/components/ErrorMessage/404.vue'),
			meta: {
				title: '404错误',
				requiresAuth: true
			}
		},
		{
			path: '/500',
			name: '500',
			component: () => import('@/components/ErrorMessage/500.vue'),
			meta: {
				title: '500网络错误',
				requiresAuth: true
			}
		},
		{
			path: '/:pathMatch(.*)*',
			component: () => import('@/components/ErrorMessage/404.vue'),
			meta: {
				title: '404错误',
				requiresAuth: true
			}
		}
	]
})

/**
 * @description 前置守卫
 */
router.beforeEach((to, from, next) => {
	next()
})

export default router
