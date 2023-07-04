export namespace Record {
	// 请求所有进出记录请求参数
	export interface ReqGetAllRecord {
		startTime: Date
	}

	// 请求所有进出记录返回数据
	export interface ResGetAllRecord {
		total: number
		recordList: []
	}

	// 记录数据
	export interface recordList {
		cardName: string
		endTime: string | null
		pictureUrl: string
		recordId: number
		role: string | null
		schNo: string
		session: number | null
		startTime: string | null
		stuTime: string
		type: string
		unitsName: string | null
		user: {
			face: file | null
			faceUrl: string | null
			name: string
			openIds: []
			recordNo: number
			role: string
			schNo: string
			session: number
			status: string | null
			unitsId: number | null
			unitsName: string
			userId: number | null
		}
	}
}
