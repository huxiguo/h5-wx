import piniaPersistConfig from '@/config/piniaPersist'
import { getViewerInfo } from '@/api/modules/viewer'
import { loginCallBack } from '@/api/modules/login'
import type { Viewer } from '@/global/viewer'

export const useViewerStore = defineStore(
	'viewer',
	() => {
		// 监视人信息
		const viewerInfo = ref<Viewer.ResViewerInfo>()
		// 监视人微信id
		const openId = ref('')
		// 登录后的回调，获取监视人信息
		const loginCallBackAction = (params: any) => {
			return loginCallBack(params)
		}
		// 获取监视人信息
		const getViewerInfoAction = async () => {
			const { result } = await getViewerInfo()
			viewerInfo.value = result
		}
		return {
			viewerInfo,
			openId,
			getViewerInfoAction,
			loginCallBackAction
		}
	},
	{
		persist: piniaPersistConfig('viewer', sessionStorage, [
			'viewerInfo',
			'openId'
		])
	}
)
