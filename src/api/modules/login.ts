import http from '..'

export const LoginApi = () => {
	return http.get('/wx/wxlogin')
}

export const loginCallBack = (params: any) => {
	return http.get<any>('/wx/callBack', params)
}
