import Datetime from './Datetime.vue'
import DatetimePopup from './DatetimePopup.vue'

function plugin (Vue) {
  Vue.component('datetime', Datetime)
  Vue.component('datetime-popup', DatetimePopup)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'

export {
  Datetime,
  DatetimePopup,
  version
}
