import SearchFilter from '~/components/utils/SearchFilter'
import PanelExpansion from '~/components/utils/PanelExpansion'
import Pagination from '~/components/utils/Pagination'
import MoreActionTable from '~/components/utils/MoreActionTable'
import Ellipsis from '~/mixins/Words'
import currencyFormatter from 'currency-formatter'
import moment from 'moment'

export default {
  components: {
    SearchFilter,
    PanelExpansion,
    Pagination,
    MoreActionTable
  },

  data () {
    return {
      masterFilters: {
        filterFrom: '',
        sortFrom: '',
        keyword: ''
      },
      panelStatus: {},
      dataComponentsDropdowns: []
    }
  },

  mounted () {
    window.moment = moment
    this.listenSearchFilter()
    this.listenPanelClose()
  },

  methods: {
    listenSearchFilter () {
      this.$bus.$on('searchFilterChanged', (data) => {
        this.searchFilterHasChanged(data)
      })
    },

    listenPanelClose () {
      this.$bus.$on('panelSayClose', (data) => {
        this.panelClose(data)
      })
    },

    searchFilterHasChanged (val) {
      this.masterFilters = val
    },

    panelClose (val) {
      this.panelStatus[val] = !this.panelStatus[val]
    },

    ellipsis (value, count, joinWith) {
      return Ellipsis(value, count, joinWith)
    },

    generateMaxString (str, max) {
      str = str.toString()
      return str.length <= max ? this.generateMaxString('0' + str, max) : str
    },

    currFormat (value, code = null) {
      let codeCurr = 'IDR'
      codeCurr = !code ? 'IDR' : code
      return currencyFormatter.format(value, { code: codeCurr })
    },

    formatDate (date, format) {
      return moment(date).format(format)
    }
  }
}
