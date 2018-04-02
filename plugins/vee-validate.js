import Vue from 'vue'
import VeeValidate from 'vee-validate'
import id from 'vee-validate/dist/locale/id'

// validator
// import UrlAlias from '~/components/form/validator/UrlAlias'

VeeValidate.Validator.localize('id', id)
// VeeValidate.Validator.extend('url_alias', UrlAlias)

// const dictionary = {
//   id: {
//     messages: {
//       min_value: (field, value) => 'Nilai ' + field + ' kurang dari ' + value,
//       max_value: (field, value) => 'Nilai ' + field + ' lebih dari ' + value
//     }
//   }
// }

// VeeValidate.Validator.localize(dictionary)

const config = {
  errorBagName: 'vv_errors',
  fieldsBagName: 'vv_fields',
  locale: 'id',
  delay: 500
}

Vue.use(VeeValidate, config)
