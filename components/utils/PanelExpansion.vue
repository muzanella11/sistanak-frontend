<template>
  <v-card flat :style="cardColor ? `background:${cardColor}` : ''" class="card__panel">
    <v-toolbar flat :style="headerCardColor ? `background:${headerCardColor} !important` : ''" :height="48">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="header"></slot>
      <v-tooltip top>
        <v-btn icon @click="collapsePanel" slot="activator">
          <v-icon>{{ showContent ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
        </v-btn>
        <span>Collapse panel</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn icon @click="closePanel" slot="activator">
          <v-icon>close</v-icon>
        </v-btn>
        <span>Close panel</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-title style="'display:flex; justify-content: center;'" v-show="showContent">
      <slot name="content"></slot>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    idPanel: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    },
    cardColor: {
      type: String,
      default: '#eeeeee'
    },
    headerCardColor: {
      type: String,
      default: '#eeeeee'
    }
  },

  mounted () {
    if (!this.idPanel) {
      throw new Error('idPanel Jangan Kosong !!!\n Kenapa Harus Di Isi? Karena idPanel di gunakan sebagai penanda panel yang akan di tutup pada proses tutup panel')
    }
  },

  data () {
    return {
      showContent: true
    }
  },

  computed: {
    getPanelId () {
      return this.idPanel
    }
  },

  methods: {
    collapsePanel () {
      this.showContent = !this.showContent
    },

    closePanel () {
      this.$bus.$emit('panelSayClose', this.getPanelId)
    }
  }
}
</script>

<style lang="stylus">
.card__panel
  font-size: 14px
  text-align: left !important
  color: #666666 !important

  & .toolbar
    background: #eeeeee !important 
  & .toolbar__content
    border-bottom: 1px solid #cccccc

  & .toolbar__title
    font-size: 20px !important
    font-weight: 600 !important
    text-align: left !important
    color: #666666 !important
    & .btn
      color: #888888 !important
</style>