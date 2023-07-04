import http from '..'
import type { Record } from '@/global/record'

export const getAllRecord = (
	currentPage: number,
	pageSize: number,
	params: Record.ReqGetAllRecord
) => {
	return http.post<Record.ResGetAllRecord>(
		`/wx-server/search-record/${currentPage}/${pageSize}`,
		params
	)
}
