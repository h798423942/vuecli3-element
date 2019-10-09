import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const message =  {
    hello: '你好',
    about: '关于',
    welcome: "欢迎",
    date: '日期',
    name: '姓名',
    address: '地址',
    el:{
        pagination:{
            goto:'前往',
            pagesize:'条/页',
            total:'共{total}条',
            pageClassifier:'页'
        }
    },
    ...zhLocale
}
export default message;