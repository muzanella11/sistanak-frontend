<template>
  <v-app id="enMainPage">
    <navigation-drawer v-if="layoutSettings.drawer"></navigation-drawer>
    <toolbar v-if="layoutSettings.toolbar"></toolbar>
    <main>
      <v-content ref="mainContent">
        <v-container>
          <v-layout>
            <nuxt />
          </v-layout>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavigationDrawer from './partials/NavigationDrawer'
import Toolbar from './partials/Toolbar'

export default {
  components: {
    NavigationDrawer,
    Toolbar
  },

  data () {
    return {
      //
    }
  },

  computed: {
    ...mapState({
      layoutSettings: state => state.layoutSettings
    })
  },

  mounted () {
    this.setLayout()
  },

  methods: {
    setLayout () {
      this.layoutSettings.drawer = true
      this.layoutSettings.toolbar = true
    }
  }
}
</script>

<style lang="stylus">
.loader-linear
  margin: 0;
</style>