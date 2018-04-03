export default {
  methods: {
    validate () {
      this.validateChild()
      return new Promise((resolve) => {
        this.$validator.validateAll().then((result) => {
          resolve(result)
        })
      })
    },
    validateChild () {
      this.$bus.$emit('validate')
    },
    clearValidator () {
      this.$validator.reset()
      this.$bus.$emit('clear')
    }
  }
}
