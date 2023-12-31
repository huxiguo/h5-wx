import type {
	AxiosInstance,
	AxiosError,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
	AxiosResponse
} from 'axios'
import { showNotify, showDialog } from 'vant'
import axios from 'axios'
import type { ResultData } from '@/api/interface'
import { ResultEnum } from '@/enums/httpEnum'
import { checkStatus } from './helper/checkStatus'
import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
import { useLoadingStore } from '@/stores/modules/loading'
import { useUrl } from '@/hooks/useUrl'

const config = {
	// 默认地址请求地址，可在 .env.** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间
	timeout: ResultEnum.TIMEOUT as number
}

class RequestHttp {
	service: AxiosInstance
	public constructor(config: AxiosRequestConfig) {
		// instantiation
		this.service = axios.create(config)

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				const userStore = useUserStore()
				const loadingStore = useLoadingStore()
				// token
				if (userStore.accessToken && userStore.refreshToken) {
					config.headers['access_token'] = userStore.accessToken
					config.headers['refresh_token'] = userStore.refreshToken
				}
				loadingStore.showLoading = true
				return config
			},
			(error: AxiosError) => {
				const loadingStore = useLoadingStore()
				loadingStore.showLoading = false
				return Promise.reject(error)
			}
		)

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const userStore = useUserStore()
				const loadingStore = useLoadingStore()
				const { data, headers } = response
				const accessToken = headers['access_token']
				const refreshToken = headers['refresh_token']
				loadingStore.showLoading = false
				if (accessToken && refreshToken) {
					// 判断上次刷新 token 的时间是否超过 6天
					const lastRefreshTokenTime = userStore.lastRefreshTokenTime
					const nowTime = new Date().getTime()
					if (nowTime - lastRefreshTokenTime > 6 * 24 * 60 * 60 * 1000) {
						// 刷新 token
						userStore.accessToken = accessToken
						userStore.refreshToken = refreshToken
						userStore.lastRefreshTokenTime = nowTime
					}
				}
				// 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					// 检测到多端登录或用户未登录
					if (data.code === 401) {
						showDialog({
							title: '提示',
							message: '检测到您多端登录或暂未登录，请先进行授权登录操作'
						}).then(async () => {
							localStorage.clear()
							location.href = useUrl()
						})
					}
					// 其他错误信息
					showNotify({ type: 'danger', message: data.message })
					return Promise.reject(data)
				}
				// 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data
			},
			async (error: AxiosError) => {
				const loadingStore = useLoadingStore()
				const { response } = error
				loadingStore.showLoading = false
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf('timeout') !== -1)
					showNotify({ type: 'danger', message: '请求超时！请您稍后重试' })
				if (error.message.indexOf('Network Error') !== -1)
					showNotify({ type: 'danger', message: '网络错误！请您稍后重试' })
				// 根据服务器响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status)
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace('/500')
				return Promise.reject(error)
			}
		)
	}

	/**
	 * @description 常用请求方法封装
	 */
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object })
	}
	post<T>(
		url: string,
		params?: object | string,
		_object = {}
	): Promise<ResultData<T>> {
		return this.service.post(url, params, _object)
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object)
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { data: params, ..._object })
	}
	download(url: string, params?: object, _object = {}): Promise<BlobPart> {
		return this.service.post(url, params, { ..._object, responseType: 'blob' })
	}
}
export default new RequestHttp(config)
