import http from '..'

// 获取监视人信息
export const getViewerInfo = () => {
	return http.get('/wx-server/getViewerInfo')
}
