<template>
  <v-layout row wrap class="l-user">
    <v-flex offset-xs2 xs8 class="pt-4 pb-4" :class="{'en-loading': isLoading}">
      <v-card flat class="user__card">
        <header class="user__card-header">
          {{ readonly ? 'Detail' : isDetail ? 'Ubah' : 'Tambah' }} Data Ownership Hewan
        </header>
        <v-progress-linear v-if="isLoading" class="loader-linear" color="red" :indeterminate="true"></v-progress-linear>
        <v-layout>
          <v-card-text>
            <span class="subheading primary--text">Informasi Detil</span>
            <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0;">
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field
                    label="Nama Pemilik Hewan"
                    name="Nama"
                    v-model="entry.fullname"
                    v-validate="`required`"
                    :error-messages="vv_errors.collect('Nama')"
                    :disabled="inputDisabled || readonly"
                    required/>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Nomor Telepon"
                    name="No.Telepon"
                    v-model="entry.phone"
                    v-validate="`required`"
                    :error-messages="vv_errors.collect('No.Telepon')"
                    :disabled="inputDisabled || readonly"
                    required/>
                </v-flex>
              </v-layout>

              <v-layout row wrap>
                <v-flex xs4>
                  <location-province :clearable="true" @input="getProvince($event)" :value="parseInt(entry.province_id)"></location-province>
                </v-flex>
                <v-flex xs4>
                  <location-region :clearable="true" :province-id="parseInt(entry.province_id)" @input="getRegion($event)" :value="parseInt(entry.region_id)" :disabled="disabledRegion"></location-region>
                </v-flex>
                <v-flex xs4>
                  <location-village :clearable="true" :city-id="parseInt(entry.region_id)" @input="getVillage($event)" :value="parseInt(entry.village_id)" :disabled="disabledVillage"></location-village>
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

        <v-layout>
          <v-card-text>
            <span class="subheading primary--text">Data Hewan</span>
            <v-container fluid grid-list-lg style="padding-left: 0; padding-right: 0;">
              <v-layout row wrap v-for="(animal, index) in entry.animal_list" :key="animal.ownership_detail_id">
                <v-flex xs12>
                  <span class="subheading primary--text">Hewan {{ index + 1 }}</span>
                </v-flex>
                <v-flex xs6>
                  <animal-list @input="setAnimalList(index, $event)" :value="parseInt(animal.animal_id)"></animal-list>
                </v-flex>
                <v-flex xs5>
                  <v-text-field
                    label="Jumlah Hewan"
                    name="Jumlah"
                    v-model="entry.animal_list[index].amount"
                    v-validate="`required`"
                    :error-messages="vv_errors.collect('Jumlah')"
                    :disabled="inputDisabled || readonly"
                    required/>
                </v-flex>
                <v-flex xs1>
                  <v-btn flat icon color="primary" @click="removeAnimal(index, animal.ownership_detail_id)">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-flex>

                <v-flex xs6>
                  <animal-group @input="setAnimalGroup(index, $event)" :value="parseInt(animal.group_id)"></animal-group>
                </v-flex>
                <v-flex xs6>
                  <animal-gender @input="setAnimalGender(index, $event)" :value="parseInt(animal.gender_id)"></animal-gender>
                </v-flex>

                <v-flex xs12>
                  <v-divider/>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12>
                  <v-btn color="primary" @click.native="addAnimal">Tambah Hewan</v-btn>
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
import * as ANIMAL from '~/store/modules/animalownership/types'
import LocationProvince from '~/components/form/fields/selects/LocationProvince'
import LocationRegion from '~/components/form/fields/selects/LocationRegion'
import LocationVillage from '~/components/form/fields/selects/LocationVillage'
import IdentityType from '~/components/form/fields/selects/IdentityType'
import AnimalList from '~/components/form/fields/selects/AnimalList'
import AnimalGroup from '~/components/form/fields/selects/AnimalGroup'
import AnimalGender from '~/components/form/fields/selects/AnimalGender'

export default {
  mixins: [validator],
  components: {
    LocationProvince,
    LocationRegion,
    LocationVillage,
    IdentityType,
    AnimalList,
    AnimalGender,
    AnimalGroup
  },

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

  computed: {
    ...mapState({
      entry: state => state.animalOwnership.entry,
      auth: state => state.auth
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
      if (this.entry.region_id) {
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
    this.pruneState()
    this.readOnlyPage()
    if (this.checkIsDetail()) {
      this.fetchResourceDetail()
    }
  },

  methods: {
    ...mapActions({
      createData: ANIMAL.CREATE_DATA,
      updateData: ANIMAL.UPDATE_DATA,
      deleteDetailData: ANIMAL.DELETE_DETAIL_DATA,
      fetchDetail: ANIMAL.FETCH_DETAIL_DATA
    }),

    ...mapMutations({
      pruneState: ANIMAL.PRUNE_STATE
    }),

    getIdentityType (val) {
      this.entry.identity_type = val
    },

    getProvince (val) {
      this.entry.province_id = parseInt(val)
    },

    getRegion (val) {
      this.entry.region_id = parseInt(val)
    },

    getVillage (val) {
      this.entry.village_id = parseInt(val)
    },

    setAnimalList (index, data) {
      this.entry.animal_list[index].animal_id = parseInt(data)
    },

    setAnimalGroup (index, data) {
      this.entry.animal_list[index].group_id = parseInt(data)
    },

    setAnimalGender (index, data) {
      this.entry.animal_list[index].gender_id = parseInt(data)
    },

    addAnimal () {
      this.entry.animal_list.push({
        ownership_id: parseInt(this.$nuxt.$route.params.id),
        animal_id: null,
        amount: null,
        group_id: null,
        gender_id: null
      })
    },

    removeAnimal (index, animalDeletedId) {
      this.entry.animal_list.splice(index, 1)
      if (animalDeletedId && animalDeletedId !== null) {
        this.entry.animal_list_delete.push(parseInt(animalDeletedId))
      }
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
      //   name: this.entry.name,
      //   description: this.entry.description
      // }
    },

    editData () {
      let id = this.$route.params.id
      this.$nuxt.$router.push('/admin/hewan/ownership/' + id)
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
        this.$nuxt.$router.push('/admin/hewan/ownership/list')
        this.isLoading = false
      }, (error) => {
        this.isLoading = false
        this.$toast.error(error.response.data.message)
      })
    },

    update () {
      let data = this.mappingBeforeSubmit()

      this.updateData({id: this.$route.params.id, data: data}).then((response) => {
        if (this.entry.animal_list_delete.length) {
          this.entry.animal_list_delete.forEach((el) => {
            this.deleteDetailData(el).then((response) => {
              //
            }, (error) => {
              this.$toast.error(error)
            })
          })
          this.$nuxt.$router.push('/admin/hewan/ownership/list')
          this.isLoading = false
        }

        this.$toast.success(response.data.message ? response.data.message : 'Data berhasil diubah')
        this.$nuxt.$router.push('/admin/hewan/ownership/list')
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


