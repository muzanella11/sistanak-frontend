<template>
  <v-app id="enMainPage">
    <main>
      <v-content ref="mainContent">
        <v-container fill-height>
          <v-layout justify-center align-center>
            <nuxt />
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      //
    }
  },

  mounted () {
    this.setBlankLayout()
  },

  methods: {
    setBlankLayout () {
      this.layoutSettings.drawer = false
      this.layoutSettings.toolbar = false
    }
  },

  computed: {
    ...mapState({
      layoutSettings: state => state.layoutSettings
    })
  }
}
</script>