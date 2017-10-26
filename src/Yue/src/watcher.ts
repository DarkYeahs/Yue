/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import Dep from './Dep'
/**
 * [constructor 订阅者类]
 * @param  {[type]}   $vm      [Yue对象]
 * @param  {[type]}   $expOrFn [key值或者函数值]
 * @param  {Function} $cb      [回调函数]
 * @param  {Function} $depIds      [发布者id队列]
 * @param  {Function} $getter      [getter函数]
 * @param  {Function} $value      [监测值]
 */
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
  /**
   * [update 对外暴露更新函数方法]
   */
  update () {
    this.run()
  }
  /**
   * [run 更新数据]
   */
  private run () {
    let val = this.get()
    let oldVal = this.$value
    if (val !== oldVal) {
      this.$value = val
      this.$cb.call(this.$vm, val, oldVal)
    }
  }

  /**
   * [addDep 将发布者加入到订阅队列中]
   * @param  {Dep}    dep [发布者]
   */
  addDep (dep: Dep) {
    if (!this.$depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.$depIds[dep.id] = dep
    }
  }
  /**
   * [get 获取观察值]
   * @return {[type]} [description]
   */
  get () {
    let val

    Dep.target = this
    val = this.$getter.apply(this.$vm, this.$vm)
    Dep.target = null
    return val
  }
  /**
   * [parseGetter 解析传入的exp]
   * @param  {[type]} exp [返回解析keys值的函数]
   * @return {[type]}     [description]
   */
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
