import enLocale from 'element-ui/lib/locale/lang/en'
const message =  {
    hello: 'hello',
    about: 'about',
    welcome: "Welcome",
    date: 'dateTime',
    name: 'name',
    address: 'address',
    el:{
        pagination:{
            goto:'前往',
            pagesize:'条/页',
            total:'共{total}条',
            pageClassifier:'页'
        }
    },
    ...enLocale
}
export default message;