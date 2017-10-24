import Dep from './Dep'
export default class Observer {
  $data:any

  constructor (data) {
    this.$data = data
    this.walk(data)
  }

  walk (data: any) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    })
  }

  convert (key, val) {
    this.defineReactive(this.$data, key, val)
  }


  defineReactive (data, key, val) {
    let dep = new Dep()
    let childObj = this.obseverChild(val)
    let me = this

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,

      set (newVal) {
        if (newVal === val) return
        val = newVal
        childObj = me.obseverChild(val)
        dep.nofity()
      },

      get () {
        if (Dep.target) dep.depend()
        return val
      }
    })
  }

  obseverChild (val) {
    if (!val || typeof val !== 'object') return
    return new Observer(val)
  }
}
