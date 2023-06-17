import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'home',
			path: '/',
			component: () => import('@/views/Home/index.vue')
		},
		{
			name: 'children',
			path: '/children',
			component: () => import('@/views/Mine/index.vue')
		}
	]
})
export default router
