/**
 * @description：请求配置
 */
export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401,
	TIMEOUT = 30000,
	TYPE = 'success'
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE'
}
