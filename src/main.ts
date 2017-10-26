import Yue from './Yue'

let yue = new Yue({
  el: '#app',
  data () {
      return {
        test: {
          test4: 'test4',
          test5: 'test5'
        },
        test1: {
          test2: 'test2',
          test3: 'test3'
        }
      }
  },

  computed: {
    computedTest () {
      let _this: any = this
      return 'computed' + _this.test4
    }
  }
})
