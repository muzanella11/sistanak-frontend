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
export default {
  data () {
    return {
      //
    }
  }
}
</script>