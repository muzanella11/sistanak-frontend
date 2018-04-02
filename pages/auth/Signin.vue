<template>
  <v-flex xs12 sm4 class="l-login">
    <v-card>
      <v-toolbar color="primary" card dark class="login__toolbar">
        <v-toolbar-title class="toolbar__logo">
          <v-icon class="display-1 white--text mr-3">cloud_queue</v-icon>
          <span class="display-1">Sistanak</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text subheading>
        <h4 class="headline">Login</h4>
        <p class="grey--text text--darken-1">Untuk melanjutkan ke dashboard</p>
        <v-flex xs12>
          <v-text-field
          label="Email anda"
          v-model="email"
          :error-messages="vv_errors.collect('email')"
          v-validate="'required|email'"
          data-vv-name="email"
          required/>
        </v-flex>

        <v-flex>
          <field-password
          label="Password anda"
          v-model="password"/>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import FieldPassword from '~/components/form/fields/Password'
export default {
  layout: 'Blank',
  components: {
    FieldPassword
  },
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="stylus">
.l-login
  position relative;
  top: 25vh;
  & .login__toolbar
    & .toolbar__logo
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 100%;
</style>