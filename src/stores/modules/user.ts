import piniaPersistConfig from '@/config/piniaPersist'
import {
	getBoundUser,
	searchUserByKeyword,
	bindBeViewer,
	unbindBeViewer
} from '@/api/modules/user'
import type { User } from '@/global/user'

export const useUserStore = defineStore(
	'user',
	() => {
		const accessToken = ref('')
		const refreshToken = ref('')
		// 上次刷新token的时间戳
		const lastRefreshTokenTime = ref(0)
		// 已绑定人的信息
		const BoundUserInfo = ref<User.ResUserInfo[]>([])
		// 用户搜索结果
		const searchResultUserList = ref<User.ResUserInfo[]>([])
		// 获取已绑定人信息
		const getBoundUserAction = async () => {
			const { result } = await getBoundUser()
			BoundUserInfo.value = result
		}
		// 根据字段查找用户
		const searchUserByKeywordAction = async (keyword: string) => {
			const { result } = await searchUserByKeyword(keyword)
			searchResultUserList.value = result
		}
		// 绑定被监视人
		const bindBeViewerAction = async (userId: number) => {
			await bindBeViewer(userId)
		}
		// 解绑被绑定人
		const unbindBeViewerAction = async (id: number) => {
			await unbindBeViewer(id)
		}
		return {
			accessToken,
			refreshToken,
			lastRefreshTokenTime,
			BoundUserInfo,
			searchResultUserList,
			getBoundUserAction,
			searchUserByKeywordAction,
			bindBeViewerAction,
			unbindBeViewerAction
		}
	},
	{
		persist: piniaPersistConfig('user', sessionStorage, [
			'accessToken',
			'refreshToken',
			'lastRefreshTokenTime',
			'BoundUserInfo'
		])
	}
)
