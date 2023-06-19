import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			name: 'home',
			path: '/home',
			component: () => import('@/views/Home/index.vue'),
			meta: {
				title: '进出记录'
			}
		},
		{
			name: 'children',
			path: '/children',
			component: () => import('@/views/Mine/index.vue'),
			meta: {
				title: '个人主页'
			}
		},
		{
			path: '/403',
			name: '403',
			component: () => import('@/components/ErrorMessage/403.vue'),
			meta: {
				title: '无权限访问'
			}
		},
		{
			path: '/404',
			name: '404',
			component: () => import('@/components/ErrorMessage/404.vue'),
			meta: {
				title: '404错误'
			}
		},
		{
			path: '/500',
			name: '500',
			component: () => import('@/components/ErrorMessage/500.vue'),
			meta: {
				title: '500网络错误'
			}
		},
		{
			path: '/:pathMatch(.*)*',
			component: () => import('@/components/ErrorMessage/404.vue'),
			meta: {
				title: '404错误'
			}
		}
	]
})

/**
 * @description 前置守卫
 */
router.beforeEach((to, from, next) => {
	// 设置页面标题
	document.title = to.meta.title || 'FaceChildren'
	next()
})

export default router
