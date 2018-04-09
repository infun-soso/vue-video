const baseUrl = 'http://vue.wclimb.site/vi/'
// 首页初始化数据
export const initHome = () => fetch(baseUrl + 'list').then(response => response.json())
