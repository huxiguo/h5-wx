import piniaPersistConfig from '@/config/piniaPersist'
export const useUserStore = defineStore(
	'user',
	() => {
		const accessToken = ref('')
		const refreshToken = ref('')
		// 上次刷新token的时间戳
		const lastRefreshTokenTime = ref(0)
		return {
			accessToken,
			refreshToken,
			lastRefreshTokenTime
		}
	},
	{
		persist: piniaPersistConfig('user', [
			'accessToken',
			'refreshToken',
			'lastRefreshTokenTime'
		])
	}
)
