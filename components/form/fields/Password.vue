<template>
  <v-text-field :label="label"
    :type="see_password && !disabled ? '' : 'password'"
    :append-icon="see_password && !disabled ? 'visibility' : 'visibility_off'"
    :append-icon-cb="() => {see_password = !see_password}"
    :value="value"
    :error-messages="vv_errors.collect('Password')"
    v-validate="'required'"
    data-vv-name="Password"
    :disabled="disabled"
    @input="value => {$emit('input', value)}"/>
</template>

<script>
export default {
  props: {
    value: {type: String},
    label: {type: String, default: 'Password'},
    disabled: {type: Boolean}
  },
  data () {
    return {
      see_password: false
    }
  }
}
</script>

