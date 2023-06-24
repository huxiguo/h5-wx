import piniaPersistConfig from '@/config/piniaPersist'

export const useLoadingStore = defineStore(
	'loading',
	() => {
		const showLoading = ref<boolean>(false)
		return { showLoading }
	},
	{
		persist: piniaPersistConfig('loading', ['showLoading', 'loading'])
	}
)
