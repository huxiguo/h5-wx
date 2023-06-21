import http from '..'

export const LoginApi = () => {
	return http.get('/wx/wxlogin')
}

export const test = (params: any) => {
	return http.get('/wx/callBack', params)
}
