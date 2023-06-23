export namespace User {
	// 用户数据
	export interface ResUserInfo {
		face: file | null
		faceUrl: string | null
		name: string
		openIds: string[] | null
		recordNo: number | null
		role: string
		schNo: string
		session: number
		status: string
		unitsId: number
		unitsName: string
		userId: number
	}
}
