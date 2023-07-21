import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL
export const useHomeStore = defineStore('home', () => {
	const userInfo = ref()
	const unit = computed(() => {
		return userInfo.value.user.unitsName.split('|').pop()
	})
	async function getUserInfo(schNo: any, stuTime: any) {
		axios.defaults.baseURL = BASE_URL
		const { data: res } = await axios.get(
			`/wx-server/getRecordByOne/${schNo}/${stuTime}`
		)
		if (res.code === 200) {
			userInfo.value = res.result
			console.log(userInfo.value)
		}
	}
	return { userInfo, unit, getUserInfo }
})
