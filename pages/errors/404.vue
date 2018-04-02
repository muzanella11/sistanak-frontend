<template>
  <v-flex xs12 sm5 class="l-error">
    <v-card color="primary" class="white--text">
      <v-card-title primary-title class="error__wrapper-logo">
        <v-icon class="display-1 white--text mr-3">cloud_queue</v-icon>
        <span class="display-1">Sistanak</span>
      </v-card-title>
      <v-card-text class="error__content">
        <h2 class="error__text-title mb-0">404</h2>
        <h3 class="error__text-title headline mb-0">Oops, halaman atau file tidak ditemukan</h3>
        <p class="mt-3">
          Maaf, halaman yang anda cari tidak berhasil kami temukan. <br>
          Mungkin anda salah mengambil jalan atau anda tidak memiliki akses ke halaman tersebut atau halaman tersebut telah diubah dan konten tersebut telah dihapus. <br>
          Coba cek kembali URL anda, lalu tekan tombol refresh pada browser anda.
        </p>
        <p>
          Mungkin solusi ini dapat membantu anda kembali ke jalan yang benar:
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn nuxt flat dark to="/" color="white">Kembali ke beranda</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  layout: 'Blank'
}
</script>

<style lang="stylus">
.l-error
  & .error__wrapper-logo
    display: flex
    justify-content: center
    align-items: center
    position: relative
    width: 100%
  & .error__content
    text-align: center
</style>


