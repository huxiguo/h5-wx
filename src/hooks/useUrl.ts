// 微信授权地址回调
export const useUrl = () => {
	const redirectUrl = encodeURIComponent(import.meta.env.VITE_REDIRECT_URL)
	const appId = import.meta.env.VITE_APP_ID
	return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
