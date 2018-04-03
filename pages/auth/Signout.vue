<template>
</template>

<script>
import * as AUTH from '~/store/modules/auth/types'
import { mapMutations } from 'vuex'

export default {
  layout: 'Blank',
  data () {
    return {
      //
    }
  },

  created () {
    this.signOut()
    this.$nuxt.$router.push('/auth/signin')
  },

  methods: {
    ...mapMutations({
      signOut: AUTH.SIGNOUT_STATE
    })
  }
}
</script>