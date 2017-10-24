import Watcher from './watcher'
import Observer from './observer'
import Compile from './compile'

export class Yue {

  $options: any;
  $el: string;
  $data: any;
  $template: string;
  $compile: any;
  $observer: Observer;

  constructor (opt) {
    this.$options = opt
    this.$el = opt.el
    this.$template = opt.template

    let data = opt.data
    if (typeof data === 'function') this.$data = data()
    else if (typeof data === 'object') this.$data = data
    else {
      throw new Error('the data param should be function or object')
    }
    this.initComputed()
    this.proxyData()
    this.$observer = new Observer(this.$data)
    if (this.$el) this.compile(this.$el)
  }

  initComputed () {
    let computed = this.$options.computed

    if (typeof computed === 'object')
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: false,
          set () {},
          get: typeof computed[key] === 'function' ? computed[key] : computed.get
        })
      })
  }

  proxyData () {
    let data = this.$data
    let me = this
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: false,

        set (newVal) {
          me.$data[key] = newVal
        },

        get () {
          return me.$data[key]
        }
      })
    })
  }

  compile (el: string) {
    this.$compile = new Compile(el, this)
  }

  mounted (el: string) {
    this.$el = el
    this.compile(this.$el)
  }

}
