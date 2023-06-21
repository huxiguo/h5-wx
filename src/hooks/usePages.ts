import router from '@/router'
import { cloneDeep } from 'lodash'

/**
 * @description 重定向
 * @param {string} path 路径
 */
export const redirectTo = (path: string) => {
	const { replace } = router
	replace({ path })
}

/**
 * 获取路由上query参数
 */
export function getRouteQuery() {
	const { currentRoute } = router
	const { query } = currentRoute.value
	return cloneDeep(query)
}
