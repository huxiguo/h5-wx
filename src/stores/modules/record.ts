import piniaPersistConfig from '@/config/piniaPersist'
import { getAllRecord } from '@/api/modules/record'
import type { Record } from '@/global/record'

export const useRecordStore = defineStore(
	'record',
	() => {
		// 当前页数
		const currentPage = ref(1)
		// 当前一页展示的数量
		const pageSize = ref(10)
		// 进出记录数据
		const recordList = ref<Record.recordList[]>([])
		// 记录总数
		const total = ref(0)
		// 是否获取完所有数据
		const isGetAll = ref<any>(false)
		// 是否获取数据中
		const isLoading = ref(false)
		// 选中的日期
		const selectDate = ref('')
		// 获取所有进出记录
		async function getAllRecordAction(params: Record.ReqGetAllRecord) {
			if (isGetAll.value || isLoading.value) return
			isLoading.value = true
			const { result } = await getAllRecord(
				currentPage.value,
				pageSize.value,
				params
			)
			recordList.value.push(...result.recordList)
			total.value = result.total
			if (result.recordList.length < pageSize.value) {
				isGetAll.value = true
			}
			isLoading.value = false
		}
		return {
			recordList,
			total,
			selectDate,
			currentPage,
			pageSize,
			isGetAll,
			getAllRecordAction
		}
	},
	{
		persist: piniaPersistConfig('record', localStorage, ['selectDate'])
	}
)
