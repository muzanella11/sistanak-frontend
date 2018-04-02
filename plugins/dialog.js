import Vue from 'vue'
import FormDialog from '~/components/utils/Dialog'

const dialog = {
  install (Vue) {
    Vue.prototype.$dialog = ({title, content}, yes, no) => {
      const FormDialogCtor = Vue.extend(FormDialog)
      const vm = new FormDialogCtor({
        propsData: {
          value: true,
          title: title,
          content: content,
          callYes: yes,
          callNo: no
        }
      })
      vm.$mount()
    }
  }
}

Vue.use(dialog)
