import en from './en'
import cn from './cn'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
const messages = {
    en: {
        message:en,
        ...enLocale
    },
    zhCN: {
        message:cn,
        ...zhLocale
    }
}
export default messages;