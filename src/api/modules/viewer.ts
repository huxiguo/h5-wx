import http from '..'
import type { Viewer } from '@/global/viewer'

// 获取监视人信息
export const getViewerInfo = () => {
	return http.get<Viewer.ResViewerInfo>('/wx-server/getViewerInfo')
}
