import Yue from './Yue'

let yue = new Yue({
  el: '#app',
  data () {
      return {
        test: 'test'
      }
  },

  computed: {
    computedTest () {
      let _this: any = this
      return 'computed' + _this.test
    }
  }
})
