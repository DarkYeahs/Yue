/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/


import Dep from './Dep'
/**
 * [constructor 监测数据类]
 * @param  {[type]} data [Yue对象上的data数据]
 */
export default class Observer {
  $data: any;

  constructor (data) {
    this.$data = data
    this.walk(data)
  }

  /**
   * [walk 建立对Yue对象上的data的所有数据的监听]
   * @param  {any}    data [Yue对象上的data数据]
   */
  walk (data: any) {
    Object.keys(data).forEach(key => {
      this.convert(key, data[key])
    })
  }

  /**
   * [convert 在Yue对象上建立数据]
   * @param  {[type]} key [key值]
   * @param  {[type]} val [value值]
   */
  convert (key, val) {
    this.defineReactive(this.$data, key, val)
  }

  /**
   * [defineReactive 在Yue对象上data重新定义数据]
   * @param  {[type]} key [key值]
   * @param  {[type]} val [value值]
   */
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
        dep.notify()
      },

      get () {
        if (Dep.target) dep.depend()
        return val
      }
    })
  }
  /**
   * [obseverChild 建立对子属性对象的监听]
   * @param  {[type]} val [子属性对象]
   */
  obseverChild (val) {
    if (!val || typeof val !== 'object') return
    return new Observer(val)
  }
}
