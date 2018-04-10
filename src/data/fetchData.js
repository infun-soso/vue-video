const baseUrl = 'http://vue.wclimb.site/vi/'
// 首页初始化数据
export const initHome = () => fetch(baseUrl + 'list').then(response => response.json())

// 获取头像
export const getAvator = (name) => fetch(baseUrl + 'avator/list?name=' + name).then(response => { return response.text() })

// 检查登录信息
export const checkUser = (name, token) => fetch(baseUrl + 'checkuser', {
  method: 'POST',
  body: JSON.stringify({ userName: name, token: token }),
  mode: 'cors'
}).then(response => response.text())

// 验证码
export const yzmChange = () => fetch(baseUrl + 'yzm/img').then(response => response.text())

// 注册登录 response箭头函数里面不能有console
export const signin = (name, pass) => fetch(baseUrl + 'signin', {
  method: 'POST',
  body: JSON.stringify({userName: name, password: pass}),
  mode: 'cors'
}).then(response => { return response.text() })
