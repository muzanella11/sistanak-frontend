<template>
  <v-menu bottom left class="btn__more-action">
    <v-btn icon slot="activator">
      <v-icon>more_horiz</v-icon>
    </v-btn>
    <v-list class="more-action__list-menu">
      <v-list-tile class="list-menu__link" v-for="item in itemsAction" :key="item.title" @click="clickYou(item.action)">
        <v-list-tile-title><i class="material-icons mr-2">{{ !item.icon ? 'stars' : item.icon }}</i> <span class="en-title">{{ item.title }}</span></v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    setting: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  computed: {
    itemsAction () {
      return !this.setting ? [] : this.setting
    }
  },

  methods: {
    clickYou (action) {
      this.$emit('clickAction', action)
    }
  }
}
</script>

<style lang="stylus">
.more-action__list-menu
  & li
    & a 
      & .list__tile__title
        display: flex
        & i 
          color: rgba(0, 0, 0, .54) !important

.en-title
  position: relative
  top:-7px
</style>

