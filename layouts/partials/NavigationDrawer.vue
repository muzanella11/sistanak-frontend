<template>
  <v-navigation-drawer
      fixed
      clipped
      app
    >
    <v-list>
      <div class="enMenu" v-for="(item, index) in items" :key="index">
        <template v-if="item.items">
          <v-list-group
            :prepend-icon="item.icon"
            no-action
            :group="item.group"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" nuxt exact :key="subItem.title" :to="{path:subItem.route}">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </template>

        <template v-else>
          <v-list-group
            :prepend-icon="item.icon"
            :group="item.group"
            no-action
          >
            <v-list-tile slot="activator" nuxt exact :key="item.title" :to="{path:item.route}">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </template>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import adminMenu from './../menu/admin'
import managerMenu from './../menu/manager'
import userMenu from './../menu/user'

export default {
  data () {
    return {
      items: []
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      if (this.userRole === 1 || this.userRole === 2) {
        this.items = adminMenu
      } else if (this.userRole === 4 || this.userRole === 5) {
        this.items = managerMenu
      } else {
        this.items = userMenu
      }
    }
  },

  computed: {
    ...mapState({
      auth: state => state.auth,
      layoutSettings: state => state.layoutSettings
    }),

    userRole () {
      return parseInt(this.auth.dataUser.user_role)
    }
  }
}
</script>