import { showNotify } from 'vant'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number) => {
	switch (status) {
		case 400:
			showNotify({ type: 'danger', message: '请求失败！请您稍后重试' })
			break
		case 401:
			showNotify({ type: 'danger', message: '登录失效！请您重新登录' })
			break
		case 403:
			showNotify({ type: 'danger', message: '当前账号无权限访问！' })
			break
		case 404:
			showNotify({ type: 'danger', message: '你所访问的资源不存在！' })
			break
		case 405:
			showNotify({ type: 'danger', message: '请求方式错误！请您稍后重试' })
			break
		case 408:
			showNotify({ type: 'danger', message: '请求超时！请您稍后重试' })
			break
		case 500:
			showNotify({ type: 'danger', message: '服务异常！' })
			break
		case 502:
			showNotify({ type: 'danger', message: '网关错误！' })
			break
		case 503:
			showNotify({ type: 'danger', message: '服务不可用！' })
			break
		case 504:
			showNotify({ type: 'danger', message: '网关超时!' })
			break
		default:
			showNotify({ type: 'danger', message: '请求失败!' })
	}
}
