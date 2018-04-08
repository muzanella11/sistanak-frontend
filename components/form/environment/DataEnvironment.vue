<template>
  <v-layout row wrap class="l-user">
    <v-flex offset-xs2 xs8 class="pt-4 pb-4" :class="{'en-loading': isLoading}">
      <v-card flat class="user__card">
        <header class="user__card-header">
          {{ readonly ? 'Detail' : isDetail ? 'Ubah' : 'Tambah' }} Data Kesehatan Lingkungan
        </header>
        <v-progress-linear v-if="isLoading" class="loader-linear" color="red" :indeterminate="true"></v-progress-linear>
        <v-layout>
          <v-card-text>
            <span class="subheading primary--text">Informasi Detil</span>
            <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0;">
              <v-layout row wrap>
                <v-flex xs4>
                  <location-province :clearable="true" @input="getProvince($event)" :value="entry.province_id"></location-province>
                </v-flex>
                <v-flex xs4>
                  <location-region :clearable="true" :province-id="parseInt(entry.province_id)" @input="getRegion($event)" :value="entry.district_id" :disabled="disabledRegion"></location-region>
                </v-flex>
                <v-flex xs4>
                  <location-village :clearable="true" :city-id="parseInt(entry.district_id)" @input="getVillage($event)" :value="entry.village_id" :disabled="disabledVillage"></location-village>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs6>
                  <yes-or-no label="Drainase" @input="getDrainase($event)" :value="entry.drainase"></yes-or-no>
                </v-flex>
                <v-flex xs6>
                  <yes-or-no label="Hygiene" @input="getHygiene($event)" :value="entry.hygiene"></yes-or-no>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs6>
                  <yes-or-no label="Sumber Air" @input="getFount($event)" :value="entry.fount"></yes-or-no>
                </v-flex>
                <v-flex xs6>
                  <yes-or-no label="Polusi" @input="getPollution($event)" :value="entry.pollution"></yes-or-no>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs6>
                  <yes-or-no label="Ketersediaan Sumber Makanan" @input="getFoodAvail($event)" :value="entry.food_availability"></yes-or-no>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Luas Area"
                    name="Area"
                    v-model="entry.land_area"
                    v-validate="`required`"
                    :error-messages="vv_errors.collect('Area')"
                    :disabled="inputDisabled || readonly"
                    required/>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Alamat"
                    v-model="entry.address"
                    :disabled="readonly"
                    required
                    multi-line/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-layout>

        <v-divider/>

        <v-card-text class="text-xs-right pb-0">
          <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0; padding-top: 0;">
            <v-layout row wrap>
              <v-flex offset-xs7 xs5 align-right>
                <v-btn flat @click="clear" v-if="!readonly">Clear</v-btn>
                <v-btn color="primary" @click="editData" v-if="readonly">Edit</v-btn>
                <v-btn color="primary" v-else @click="submit" :loading="submitting">{{ checkIsDetail() ? 'Ubah' : 'Simpan' }}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import validator from '~/mixins/validator'
import { mapActions, mapState, mapMutations } from 'vuex'
import * as ENVIRONMENT from '~/store/modules/environment/types'
import LocationProvince from '~/components/form/fields/selects/LocationProvince'
import LocationRegion from '~/components/form/fields/selects/LocationRegion'
import LocationVillage from '~/components/form/fields/selects/LocationVillage'
import YesOrNo from '~/components/form/fields/selects/YesOrNo'

export default {
  mixins: [validator],

  data () {
    return {
      itemsRoles: [
        'Individu',
        'Instansi',
        'Admin'
      ],
      isLoading: false,
      isDetail: false,
      isInstansi: false,
      inputDisabled: false,
      disabledSubmit: true,
      readonly: false,
      submitting: false
    }
  },

  components: {
    LocationProvince,
    LocationRegion,
    LocationVillage,
    YesOrNo
  },

  computed: {
    ...mapState({
      entry: state => state.environment.entry
    }),

    disabledRegion () {
      let flag = true
      if (this.entry.province_id) {
        flag = false
      }

      return flag
    },

    disabledVillage () {
      let flag = true
      if (this.entry.district_id) {
        flag = false
      }

      return flag
    }
  },

  watch: {
    '$route' () {
      this.readOnlyPage()
    }
  },

  mounted () {
    this.readOnlyPage()
    if (this.checkIsDetail()) {
      this.fetchResourceDetail()
    }
  },

  methods: {
    ...mapActions({
      createData: ENVIRONMENT.CREATE_DATA,
      updateData: ENVIRONMENT.UPDATE_DATA,
      fetchDetail: ENVIRONMENT.FETCH_DETAIL_DATA
    }),

    ...mapMutations({
      pruneState: ENVIRONMENT.PRUNE_STATE
    }),

    getProvince (val) {
      this.entry.province_id = parseInt(val)
    },

    getRegion (val) {
      console.info('region : ', val)
      this.entry.district_id = parseInt(val)
    },

    getVillage (val) {
      this.entry.village_id = parseInt(val)
    },

    getDrainase (val) {
      this.entry.drainase = parseInt(val)
    },

    getHygiene (val) {
      this.entry.hygiene = parseInt(val)
    },

    getFount (val) {
      this.entry.fount = parseInt(val)
    },

    getPollution (val) {
      this.entry.pollution = parseInt(val)
    },

    getFoodAvail (val) {
      this.entry.food_availability = parseInt(val)
    },

    readOnlyPage () {
      let flag = false
      let query = this.$nuxt.$route.query

      if (query.detail) {
        flag = true
      }

      this.readonly = flag
    },

    checkIsDetail () {
      let router = this.$route.params
      let flag = false

      if (router.id) {
        flag = true
      }

      return flag
    },

    fetchResourceDetail () {
      let router = this.$route.params

      this.isLoading = true
      this.fetchDetail(router.id).then((res) => {
        this.mappingDetail()
        this.isLoading = false
      }, () => {
        this.$toast.error('Terjadi kesalahan, silahkan muat ulang halaman')
        this.isLoading = false
      })
      this.isDetail = true
    },

    mappingBeforeSubmit () {
      let data = this.entry

      return data
    },

    mappingDetail () {
      // this.entry = {
      //   name: this.entry.name
      // }
    },

    editData () {
      let id = this.$route.params.id
      this.$nuxt.$router.push('/admin/environment/' + id)
    },

    submit () {
      this.isLoading = true
      this.validate().then((result) => {
        if (result) {
          if (this.checkIsDetail()) {
            this.update()
          } else {
            this.create()
          }
        } else {
          this.isLoading = false
        }
      })
    },

    create () {
      let data = this.mappingBeforeSubmit()
      this.createData(data).then((response) => {
        this.$toast.success(response.data.message ? response.data.message : 'Data berhasil dimasukan')
        this.$nuxt.$router.push('/admin/environment/list')
        this.isLoading = false
      }, (error) => {
        this.isLoading = false
        this.$toast.error(error.response.data.message)
      })
    },

    update () {
      let data = this.mappingBeforeSubmit()
      // let takeoutItems = ['email', 'password']
      // takeoutItems.forEach((el) => {
      //   delete data[el]
      // })

      this.updateData({id: this.$route.params.id, data: data}).then((response) => {
        this.$toast.success(response.data.message ? response.data.message : 'Data berhasil diubah')
        this.$nuxt.$router.push('/admin/environment/list')
        this.isLoading = false
      }, (error) => {
        this.isLoading = false
        this.$toast.error(error.response.data.message)
      })
    },

    clearMember () {
      this.pruneState()

      if (this.checkIsDetail()) {
        this.entry.name = this.entry.name
        this.entry.email = this.entry.email
      }
    },

    clear () {
      this.clearMember()
      setTimeout(() => {
        this.clearValidator()
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
.l-user
  & .user-content
    padding-top: 24px
  &.loading
    &:before
      content: ''
      position: fixed
      width: 100%
      height: 100%
      top: 0
      background: rgba(0,0,0,.25)
      z-index: 11
      left: 0
  & .user-label
    color: rgba(0,0,0,.54)
    font-size: 16px

  & .user__card
    & .user__card-header
      position: relative; border-bottom: 1px solid #eee; padding: 16px; font-size: 20px; color: #666666; font-weight: 600;

</style>


