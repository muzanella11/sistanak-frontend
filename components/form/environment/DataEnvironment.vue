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
            <span class="subheading primary--text">Informasi Kepemilikan Lingkungan</span>
            <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0;">
              <v-tabs icons-and-text centered dark color="cyan" v-model="tabsActive">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab href="#tabCreateNew" :disabled="disabledTab.create" @click="tabClick('create')">
                  Buat Manual
                  <v-icon>create</v-icon>
                </v-tab>
                <v-tab href="#tabAnimalOwnership" :disabled="disabledTab.ownership" @click="tabClick('ownership')">
                  Data Kepemilikan Hewan
                  <v-icon>pets</v-icon>
                </v-tab>
                <v-tab-item id="tabCreateNew">
                  <v-card flat>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            label="Nama Pemilik"
                            name="Nama"
                            v-model="entry.fullname"
                            v-validate="`required`"
                            :error-messages="vv_errors.collect('Nama')"
                            :disabled="inputDisabled || readonly"
                            required/>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-text-field
                            label="Nomor Identitas"
                            name="No.Identitas"
                            v-model="entry.identity_number"
                            v-validate="`required`"
                            :error-messages="vv_errors.collect('No.Identitas')"
                            :disabled="inputDisabled || readonly"
                            required/>
                        </v-flex>
                        <v-flex xs6>
                          <identity-type @input="getIdentityType($event)" :value="parseInt(entry.identity_type)"></identity-type>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item id="tabAnimalOwnership">
                  <v-card flat>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <animal-ownership @input="getOwnership($event)" :value="parseInt(entry.ownership_id)"></animal-ownership>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-text-field
                            label="Nomor Identitas"
                            name="No.Identitas"
                            v-model="entry.identity_number"
                            v-validate="`required`"
                            :error-messages="vv_errors.collect('No.Identitas')"
                            :disabled="true"
                            required/>
                        </v-flex>
                        <v-flex xs6>
                          <identity-type @input="getIdentityType($event)" :value="parseInt(entry.identity_type)" :disabled="true"></identity-type>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </v-card-text>
        </v-layout>

        <v-divider/>
        
        <v-layout>
          <v-card-text>
            <span class="subheading primary--text">Informasi Detil</span>
            <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0;">
              <v-layout row wrap>
                <v-flex xs4>
                  <location-province :clearable="true" @input="getProvince($event)" :value="entry.province_id" :disabled="disabledInput.province"></location-province>
                </v-flex>
                <v-flex xs4>
                  <location-region :clearable="true" :province-id="parseInt(entry.province_id)" @input="getRegion($event)" :value="entry.district_id" :disabled="disabledRegion || disabledInput.district"></location-region>
                </v-flex>
                <v-flex xs4>
                  <location-village :clearable="true" :city-id="parseInt(entry.district_id)" @input="getVillage($event)" :value="entry.village_id" :disabled="disabledVillage || disabledInput.village"></location-village>
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
                    :disabled="readonly || disabledInput.address"
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
import IdentityType from '~/components/form/fields/selects/IdentityType'
import AnimalOwnership from '~/components/form/fields/selects/AnimalOwnership'

export default {
  mixins: [validator],

  data () {
    return {
      itemsRoles: [
        'Individu',
        'Instansi',
        'Admin'
      ],
      tabsActive: null,
      isLoading: false,
      isDetail: false,
      isInstansi: false,
      inputDisabled: false,
      disabledSubmit: true,
      readonly: false,
      submitting: false,
      disabledInput: {
        province: false,
        district: false,
        village: false,
        address: false
      },
      disabledTab: {
        create: false,
        ownership: false
      },
      localTempData: {
        entry: {}
      }
    }
  },

  components: {
    LocationProvince,
    LocationRegion,
    LocationVillage,
    YesOrNo,
    IdentityType,
    AnimalOwnership
  },

  computed: {
    ...mapState({
      entry: state => state.environment.entry,
      tempEnvironment: state => state.environment.temp,
      animalOwnership: state => state.animalOwnership.entries
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
    },
    'entry.ownership_id' (val) {
      this.getDataOwnership(val)
    }
  },

  mounted () {
    this.pruneState()
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

    getDataOwnership (id) {
      if (!this.checkIsDetail()) {
        console.info('id : ', id)
        if (id) {
          let dataMaster = this.animalOwnership
          let ownerShipData = dataMaster.find((el) => {
            if (el.ownership_id === id) {
              return el
            }
          })

          this.tempEnvironment.animalOwnership = ownerShipData

          this.entry.fullname = ownerShipData.fullname
          this.entry.province_id = ownerShipData.province_id
          this.entry.district_id = ownerShipData.region_id
          this.entry.village_id = ownerShipData.village_id
          this.entry.identity_type = ownerShipData.identity_type
          this.entry.identity_number = ownerShipData.identity_number
          this.entry.address = ownerShipData.address

          this.disabledTab.create = true

          this.tabsActive = 'tabAnimalOwnership'

          this.disabledWhenOwnership()
        } else {
          this.pruneOwnership(false)

          this.disabledTab.create = false

          this.tabsActive = null

          this.disabledWhenOwnership(false)
        }
      } else {
        console.info('here me ')
        if (id) {
          console.info('adasdsd')
          let dataMaster = this.animalOwnership
          let ownerShipData = dataMaster.find((el) => {
            if (el.ownership_id === id) {
              return el
            }
          })

          this.tempEnvironment.animalOwnership = ownerShipData

          this.entry.fullname = ownerShipData.fullname
          this.entry.province_id = ownerShipData.province_id
          this.entry.district_id = ownerShipData.region_id
          this.entry.village_id = ownerShipData.village_id
          this.entry.identity_type = ownerShipData.identity_type
          this.entry.identity_number = ownerShipData.identity_number
          this.entry.address = ownerShipData.address

          this.disabledTab.create = true

          this.tabsActive = 'tabAnimalOwnership'

          this.disabledWhenOwnership()
        } else {
          this.pruneOwnership(false)

          this.disabledTab.create = false

          this.tabsActive = 'tabCreateNew'

          this.disabledWhenOwnership(false)
        }
      }
    },

    disabledWhenOwnership (action = true) {
      this.disabledInput.province = action
      this.disabledInput.district = action
      this.disabledInput.village = action
      this.disabledInput.address = action
    },

    tabClick (val) {
      if (val === 'create') {
        this.disabledWhenOwnership(false)
        if (this.checkIsDetail()) {
          this.pruneOwnership(false)
        } else {
          this.pruneOwnership(true)
        }
      }
    },

    pruneOwnership (setNull = true) {
      if (!setNull) {
        this.entry.fullname = this.localTempData.entry.fullname
        this.entry.identity_number = this.localTempData.entry.identity_number
        this.entry.identity_type = this.localTempData.entry.identity_type
        this.entry.province_id = this.localTempData.entry.province_id
        this.entry.district_id = this.localTempData.entry.district_id
        this.entry.village_id = this.localTempData.entry.village_id
        this.entry.address = this.localTempData.entry.address
      } else {
        this.entry.ownership_id = null
        this.entry.fullname = null
        this.entry.identity_number = null
        this.entry.identity_type = null
        this.entry.province_id = null
        this.entry.district_id = null
        this.entry.village_id = null
        this.entry.address = null
      }
    },

    getOwnership (val) {
      this.entry.ownership_id = val === 0 ? null : parseInt(val)
    },

    getIdentityType (val) {
      this.entry.identity_type = parseInt(val)
    },

    getProvince (val) {
      this.entry.province_id = parseInt(val)
    },

    getRegion (val) {
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
        let data = res.data.data[0]
        let dataRes = Object.assign({}, data)
        this.localTempData.entry = dataRes
      }, () => {
        this.$toast.error('Terjadi kesalahan, silahkan muat ulang halaman')
        this.isLoading = false
      })
      this.isDetail = true
    },

    mappingBeforeSubmit () {
      let data = this.entry

      if (data.ownership_id === null) {
        data.ownership_id = null
      }

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
        this.entry.fullname = this.entry.fullname
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


