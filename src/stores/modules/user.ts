import piniaPersistConfig from '@/config/piniaPersist'
import {
	getBoundUser,
	searchUserByKeyword,
	bindBeViewer,
	unbindBeViewer,
	getInOutInfo
} from '@/api/modules/user'
import type { User } from '@/global/user'

export const useUserStore = defineStore(
	'user',
	() => {
		const schNo = ref('')
		const stuTime = ref('')
		const accessToken = ref('')
		const refreshToken = ref('')
		// 上次刷新token的时间戳
		const lastRefreshTokenTime = ref(0)
		// 已绑定人的信息
		const BoundUserInfo = ref<User.ResUserInfo[]>([])
		// 用户搜索结果
		const searchResultUserList = ref<User.ResUserInfo[]>([])
		// 获取已绑定人信息
		async function getBoundUserAction() {
			const { result } = await getBoundUser()
			BoundUserInfo.value = result
		}
		// 根据字段查找用户
		async function searchUserByKeywordAction(keyword: string) {
			const { result } = await searchUserByKeyword(keyword)
			searchResultUserList.value = result
		}
		// 绑定被监视人
		async function bindBeViewerAction(userId: number) {
			await bindBeViewer(userId)
		}
		// 解绑被绑定人
		async function unbindBeViewerAction(id: number) {
			await unbindBeViewer(id)
		}
		// 获取出入信息
		async function getInOutInfoAction(schNo: string, timestamp: string) {
			const { result } = await getInOutInfo(schNo, timestamp)
			return result
		}
		return {
			schNo,
			stuTime,
			accessToken,
			refreshToken,
			lastRefreshTokenTime,
			BoundUserInfo,
			searchResultUserList,
			getBoundUserAction,
			searchUserByKeywordAction,
			bindBeViewerAction,
			unbindBeViewerAction,
			getInOutInfoAction
		}
	},
	{
		persist: piniaPersistConfig('user', localStorage, [
			'accessToken',
			'refreshToken',
			'lastRefreshTokenTime',
			'BoundUserInfo'
		])
	}
)
