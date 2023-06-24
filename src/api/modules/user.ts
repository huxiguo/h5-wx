import http from '..'
import type { User } from '@/global/user'

// 获取被监视人信息
export const getBoundUser = () => {
	return http.get<User.ResUserInfo[]>('/wx-server/getBoundUser')
}

// 根据字段查找用户
export const searchUserByKeyword = (keyword: string) => {
	return http.get<User.ResUserInfo[]>(
		`/wx-server/searchUserByKeyword/${keyword}`
	)
}

// 绑定被监视人
export const bindBeViewer = (userId: number) => {
	return http.post(`/wx-server/bindBeViewer/${userId}`)
}

// 解除被绑定人
export const unbindBeViewer = (id: number) => {
	return http.delete(`/wx-server/unbindBeViewer/${id}`)
}

// 获取出入信息
export const getInOutInfo = (schNo: string, timestamp: string) => {
	return http.get<any>(`/wx-server/getRecordByOne/${schNo}/${timestamp}`)
}
