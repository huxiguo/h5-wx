import piniaPersistConfig from '@/config/piniaPersist'
import { getAllRecord } from '@/api/modules/record'
import type { Record } from '@/global/record'

export const useRecordStore = defineStore(
	'record',
	() => {
		// 进出记录数据
		const recordList = ref<Record.recordList[]>([])
		// 记录总数
		const total = ref(0)
		// 选中的日期
		const selectDate = ref('')
		// 获取所有进出记录
		async function getAllRecordAction(
			currentPage: number,
			pageSize: number,
			params: Record.ReqGetAllRecord
		) {
			const { result } = await getAllRecord(currentPage, pageSize, params)
			recordList.value = result.recordList
			total.value = result.total
		}
		return { recordList, total, selectDate, getAllRecordAction }
	},
	{
		persist: piniaPersistConfig('record', localStorage, ['selectDate'])
	}
)
