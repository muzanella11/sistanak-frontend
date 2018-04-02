<template>
  <v-flex xs12 sm4 class="l-login">
    <v-card>
      <v-toolbar color="primary" card dark class="login__toolbar">
        <v-toolbar-title class="toolbar__logo">
          <v-icon class="display-1 white--text mr-3">cloud_queue</v-icon>
          <span class="display-1">Sistanak</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-progress-linear v-if="isLoading" class="loader-linear" color="red" :indeterminate="true"></v-progress-linear>
      <v-layout :class="{'en-loading': isLoading}">
        <v-card-text subheading>
          <h4 class="headline">Login</h4>
          <p class="grey--text text--darken-1">Untuk melanjutkan ke dashboard</p>
          <v-flex xs12>
            <v-text-field
            label="Masukan Email atau Username"
            v-model="variables"
            :error-messages="vv_errors.collect('variables')"
            v-validate="'required'"
            data-vv-name="variables"
            required/>
          </v-flex>

          <v-flex xs12>
            <field-password
            label="Password anda"
            v-model="password"/>
          </v-flex>

          <v-flex xs12>
            <v-btn block color="primary" @click="submit">Masuk</v-btn>
          </v-flex>
        </v-card-text>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import * as AUTH from '~/store/modules/auth/types'
import { mapActions } from 'vuex'
import FieldPassword from '~/components/form/fields/Password'
export default {
  layout: 'Blank',
  components: {
    FieldPassword
  },

  data () {
    return {
      isLoading: false,
      variables: '',
      password: ''
    }
  },

  methods: {
    ...mapActions({
      authentication: AUTH.SIGNIN
    }),
    submit () {
      let data = {username: this.variables, password: this.password}
      this.authentication(data).then((response) => {
        this.$toast.success('Selamat Datang Kembali !')
      }, (error) => {
        this.$toast.error(error.messages)
      })
    }
  },

  mounted () {
    //
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

  & .loader-linear
    margin: 0;
</style>