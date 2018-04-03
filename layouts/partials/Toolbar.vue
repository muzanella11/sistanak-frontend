<template>
  <v-toolbar
    color="primary"
    dense
    fixed
    clipped-left
    app
    class="white--text"
    height="60"
  >
    <v-toolbar-side-icon class="white--text" @click.stop="layoutSettings.drawer = !layoutSettings.drawer"></v-toolbar-side-icon>
    <v-icon class="white--text">cloud_queue</v-icon>
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">Sistanak</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="white--text">
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon class="white--text">
      <v-icon>message</v-icon>
    </v-btn>
    <v-menu offset-y>
      <v-list-tile-avatar slot="activator">
        <img :src="`https://randomuser.me/api/portraits/men/11.jpg`" alt="">
      </v-list-tile-avatar>
      <v-list class="enDropdownCustom">
        <div class="list__tile list__tile--link">
          asdasd
        </div>
      </v-list>
    </v-menu>
    <!-- <v-spacer></v-spacer>
    <v-layout row align-center style="max-width: 650px">
      <v-text-field
        placeholder="Search..."
        single-line
        append-icon="search"
        :append-icon-cb="() => {}"
        color="white"
        hide-details
      ></v-text-field>
    </v-layout> -->
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  },

  computed: {
    ...mapState({
      layoutSettings: state => state.layoutSettings
    })
  }
}
</script>