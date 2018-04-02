<template>
  <v-dialog v-model="show" max-width="290">
    <v-card>
      <v-card-title v-if="title" class="headline">{{title}}</v-card-title>
      <v-card-text>{{content}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="no">Tidak</v-btn>
        <v-btn flat color="primary" @click="yes">Ya</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    },
    title: String,
    value: {
      type: Boolean,
      default: false
    },
    callYes: Function,
    callNo: Function
  },
  data: () => ({
    show: false
  }),
  watch: {
    value (value) {
      this.show = value
    }
  },
  mounted () {
    this.show = this.value
  },
  methods: {
    yes () {
      if (typeof this.callYes === 'function') {
        this.callYes()
      }

      this.show = false
    },
    no () {
      if (typeof this.callNo === 'function') {
        this.callNo()
      }

      this.show = false
    }
  }
}
</script>
