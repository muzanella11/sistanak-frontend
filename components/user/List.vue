<template>
  <v-layout row wrap class="l-user">
    <v-layout row class="user-filter">
      <search-filter ref="campaignSpecialFilter" labelInput="Cari Nama User" :dataDropdowns="dataComponentsDropdowns"></search-filter>
    </v-layout>
    <v-container grid-list-lg class="user-content">
      <v-layout row wrap>
        <v-flex xs12 v-show="panelStatus.listCampaignSpecial">
          <panel-expansion idPanel="listCampaignSpecial" title="Data User" cardColor="#ffffff" headerCardColor="white">
            <div slot="header">
              <v-tooltip top v-if="filters.q">
                <v-btn icon slot="activator" @click="clearFilter">
                  <v-icon>delete</v-icon>
                </v-btn>
                <span>Hapus filter</span>
              </v-tooltip>

              <v-tooltip top>
                <v-btn icon slot="activator" @click="downloadList">
                  <v-icon>file_download</v-icon>
                </v-btn>
                <span>Download</span>
              </v-tooltip>
            </div>
            <div slot="content" style="position: relative; width: 100%;">
              <v-data-table
                :loading="isLoading"
                :headers="headers"
                :items="entries"
                :search="search"
                hide-actions
              >
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">
                      {{ props.header.text }}
                    </span>
                    <span>
                      {{ props.header.text }}
                    </span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td>
                    <a href="javascript:;" @click="getDetail(props.item.user_id)">
                      {{ props.item.name }}
                    </a>
                  </td>
                  <td>
                    {{ props.item.username }}
                  </td>
                  <td>
                    {{ props.item.nik }}
                  </td>
                  <td>
                    {{ props.item.user_role_detail.name }}
                  </td>
                  <td>
                    {{ props.item.assign_task ? 'Ya' : 'Tidak' }}
                  </td>
                  <td>
                    {{ formatDate(props.item.date_created, 'HH:mm | DD MMM YYYY') }}
                  </td>
                  <td>
                    <more-action-table :setting="itemsAction" @clickAction="getActionItems($event, props.item.user_id)"></more-action-table>
                  </td>
                </template>
              </v-data-table>
              <pagination v-if="totalItems > 0 && entries.length > 0" :meta="{total_pages: totalPages, current_page: pagination.page}" :limitPage="10" @update="paginationChanged($event)"></pagination>
            </div>
          </panel-expansion>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog
      v-model="detailDialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay=false
      scrollable
    >
      <v-card>
        <v-toolbar style="flex: 0 0 auto;" dark class="primary">
          <v-btn icon @click.native="detailDialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Detil User</v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="detailDialog">
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex xs8 offset-xs2 style="border: 2px solid #eee; padding: 24px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <v-icon class="display-1 mr-3">cloud_queue</v-icon>
                  <span class="display-1">Sistanak</span>
                </div>

                <hr>

                <v-layout row wrap style="text-align: left; margin-top: 20px;">
                  <v-flex xs3>
                  </v-flex>
                  <v-flex xs6></v-flex>
                  <v-flex xs3 style="text-align: right;">
                    {{ formatDate(entriesDetail.date_created, 'HH:mm | DD MMM YYYY') }}
                  </v-flex>
                </v-layout>

                <v-layout row wrap style="text-align: left; margin-top: 24px;">
                  <v-flex xs8 offset-xs2 style="border: 2px solid #eee;border-radius: 3px;padding: 24px;">
                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Nama
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.name }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Nik
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.nik }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Role
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.user_role_detail.name }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Telepon
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.phone }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Alamat
                        </b>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap style="border: 2px solid #eee;border-radius: 3px;padding: 12px;">
                      <v-flex xs12>
                        {{ entriesDetail.address }}
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap style="margin: 32px 0;">
                      <v-flex xs12>
                        <v-divider/>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs4>
                        <b>
                          Status Penugasan
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.assign_task ? 'Sedang dalam penugasan' : 'Tidak dalam penugasan' }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap v-if="entriesDetail.assign_task === 1">
                      <v-flex xs4>
                        <b>
                          Pemberi Perintah
                        </b>
                      </v-flex>
                      <v-flex xs8>
                        {{ entriesDetail.giver_task_detail.name }}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-btn block color="primary" @click="assignTask(entriesDetail)" v-if="entriesDetail.assign_task === 0">Tetapkan Penugasan</v-btn>
                        <v-btn block color="cyan" class="white--text" @click="downloadPenugasan(entriesDetail)" v-if="entriesDetail.assign_task === 1">Unduh Surat Penugasan</v-btn>
                        <v-btn block color="red" class="white--text" @click="assignTask(entriesDetail)" v-if="entriesDetail.assign_task === 1">Akhiri Penugasan</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import * as USER from '~/store/modules/user/types'
import AnalyticPage from '~/mixins/AnalyticPage'

export default {
  mixins: [AnalyticPage],

  data () {
    return {
      search: '',
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        {
          text: 'Nama',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Username',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Nik',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Role',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Status Penugasan',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Tanggal',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'status'
        }
      ],
      itemsAction: [
        {
          title: 'Edit',
          action: 'edit',
          icon: 'edit'
        },
        {
          title: 'Hapus',
          action: 'delete',
          icon: 'delete'
        }
      ],
      panelStatus: {
        listCampaignSpecial: true
      },
      dataMaster: [],
      dataComponentsDropdowns: [
        // {
        //   name: 'filter',
        //   type: 'dropdowns',
        //   setting: {
        //     entries: [
        //       {
        //         label: 'Provinsi',
        //         value: 1
        //       },
        //       {
        //         label: 'Role',
        //         value: 2
        //       }
        //     ],
        //     label: 'Filter dari',
        //     loading: false,
        //     multiLine: false,
        //     multiple: false,
        //     required: false,
        //     setItemsText: 'label',
        //     setItemsValue: 'value'
        //   }
        // },
        // {
        //   name: 'sort',
        //   type: 'dropdowns',
        //   setting: {
        //     entries: [
        //       {
        //         label: 'Provinsi',
        //         value: 1
        //       },
        //       {
        //         label: 'Role',
        //         value: 2
        //       }
        //     ],
        //     label: 'Lihat dari',
        //     loading: false,
        //     multiLine: false,
        //     multiple: false,
        //     required: false,
        //     setItemsText: 'label',
        //     setItemsValue: 'value'
        //   }
        // }
      ],
      isLoading: false,
      detailDialog: false
    }
  },

  computed: {
    ...mapState({
      auth: state => state.auth,
      entries: state => state.user.entries,
      entriesDetail: state => state.user.entriesDetail
    }),
    filters () {
      let data = {
        q: this.masterFilters.keyword ? this.masterFilters.keyword : null,
        role: null,
        sort: 'newest',
        limit: this.pagination.rowsPerPage,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage
      }
      return data
    },
    totalItems () {
      return this.dataMaster.totalData
    },
    totalPages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.totalItems / this.pagination.rowsPerPage) : 0
    },
    webUrl () {
      return process.env.apiWebUrl
    }
  },

  watch: {
    masterFilters: {
      handler: function (after, before) {
        this.pagination.page = 1
        if (after.keyword) {
          setTimeout(() => {
            this.fetchResource()
          }, 1000)
        } else {
          this.fetchResource()
        }
      },
      deep: true
    }
  },

  mounted () {
    this.fetchResource()
  },

  methods: {
    ...mapActions({
      fetchUser: USER.FETCH_RESOURCE,
      fetchUserDetail: USER.FETCH_DETAIL,
      updateData: USER.UPDATE_DATA,
      deleteUser: USER.DELETE_DATA,
      downloadReport: USER.DOWNLOAD_REPORT,
      setPenugasan: USER.SET_PENUGASAN
    }),

    fetchResource () {
      this.isLoading = true
      this.dataMaster = {}
      let data = this.filters

      this.fetchUser(data).then((response) => {
        this.dataMaster = response.data
        this.isLoading = false
      }, () => {
        this.isLoading = false
      })
    },

    paginationChanged (page) {
      this.pagination.page = page
      this.fetchResource()
    },

    clearFilter () {
      this.$refs.campaignSpecialFilter.clearFilter()
    },

    downloadList () {
      // let dateNow = window.moment().format('YYYY-MM-DD_HH-mm-ss')
      // console.info('dadaadada : ', dateNow)
      this.downloadReport().then(response => {
        window.open('//' + response.data.urlData, 'Download')
        window.focus()
      })
    },

    downloadPenugasan (data) {
      this.setPenugasan({penerima_id: data.user_id, pemberi_id: parseInt(this.auth.dataUser.user_id)}).then((response) => {
        window.open('//' + response.data.urlData, 'Download')
        window.focus()
      }, () => {
        this.$toast.error('Terjadi Kesalahan Saat Menset Penugasan')
      })
    },

    assignTask (data) {
      this.$dialog({title: data.assign_task === 0 ? 'Tetapkan Penugasan' : 'Akhiri Penugasan', content: data.assign_task === 0 ? 'Anda yakin akan menetapkan penugasan kepada user ini?' : 'Anda yakin akan mengakhiri penugasan kepada user ini?'}, () => {
        this.updateData({id: data.user_id, data: {assign_task: data.assign_task === 0 ? 1 : 'nol', giver_task: data.assign_task === 0 ? parseInt(this.auth.dataUser.user_id) : null}}).then(() => {
          this.$toast.success(data.assign_task === 0 ? 'Berhasil menetapkan penugasan' : 'Berhasil mengakhiri penugasan')
          this.detailDialog = false
          if (data.assign_task === 0) {
            this.setPenugasan({penerima_id: data.user_id, pemberi_id: parseInt(this.auth.dataUser.user_id)}).then((response) => {
              window.open('//' + response.data.urlData, 'Download')
              window.focus()
            }, () => {
              this.$toast.error('Terjadi Kesalahan Saat Menset Penugasan')
            })
          }
          this.fetchResource()
        }, () => {
          this.$toast.error(data.assign_task === 0 ? 'Gagal menetapkan penugasan' : 'Gagal mengakhiri penugasan')
        })
      })
    },

    getDetail (id) {
      this.fetchUserDetail(id).then((response) => {
        this.detailDialog = true
      }, () => {
        this.$toast.error('Something error when fetching detail')
      })
    },

    getActionItems (action, id) {
      if (action === 'edit') {
        this.$nuxt.$router.push('/admin/user/' + id)
      } else if (action === 'delete') {
        this.$dialog({title: 'Hapus User', content: 'Anda yakin akan menghapus user ini?'}, () => {
          this.deleteUser(id).then(() => {
            this.fetchResource()
            this.$toast.success('Berhasil menghapus data')
          }, () => {
            this.fetchResource()
            this.$toast.error('Gagal menghapus data')
          })
        })
      } else {
        this.$toast.error('Not found action')
      }
    }
  }
}
</script>

<style lang="stylus">
a:-webkit-any-link
  text-decoration: none;

.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0

.l-user
  & .user-filter
    position: relative
    margin: -16px
    margin-bottom: 0
    background: #eeeeee

  & .user-content
    padding-top: 24px

.card__amount
  & .card__media__content
    background: #9b9b9b
    display: flex
    justify-content: center
    align-items: center
    color: white
    font-size: 40px
    font-weight: 600
  & .amount-title
    font-size: 16px
    line-height: 1.5
    text-align: center
    color: #666666
    padding: 24px
    background: #eeeeee
    display: flex
    justify-content: center
</style>
