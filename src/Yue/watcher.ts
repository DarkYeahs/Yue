import Dep from './Dep'
export default class Watcher {
  $vm:any;
  $cb: any;
  $expOrFn: any;
  $depIds: any;
  $getter: Function;
  $value: any;

  constructor (vm, expOrFn, cb) {
    this.$cb = cb
    this.$vm = vm
    this.$expOrFn = expOrFn
    this.$depIds = {}

    if (typeof expOrFn === 'function') this.$getter = expOrFn
    else this.$getter = this.parseGetter(expOrFn)

    this.$value = this.get()
  }

  update () {
    this.run()
  }

  private run () {
    let val = this.get()
    let oldVal = this.$value
    if (val !== oldVal) {
      this.$value = val
      this.$cb.apply(this.$vm, val, oldVal)
    }
  }

  addDep (dep: Dep) {
    if (!this.$depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.$depIds[dep.id] = dep
    }
  }

  get () {
    let val

    Dep.target = this
    val = this.$getter.call(this.$vm, this.$vm)
    Dep.target = null
    return val
  }

  parseGetter (exp) {
    if (/^\W.$/.test(exp)) return function () {}
    let exps = exp.split('.')
    return function (obj) {
      let len = exps.length
      for (let i = 0; i < len; i++) {
        if (!obj) return
        obj = obj[exps[i]]
      }
      return obj
    }
  }


}
