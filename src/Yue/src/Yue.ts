/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import Watcher from './watcher'
import Observer from './observer'
import Compile from './compile'
/**
 * [constructor Yue类]
 * @param  {[type]} $options [配置项]
 * @param  {[type]} $el [el元素id]
 * @param  {[type]} $data [监测数据]
 * @param  {[type]} $template [模版]
 * @param  {[type]} $compile [编译对象]
 * @param  {[type]} $observer [数据监测对象]
 */
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
  /**
   * [initComputed 初始化computerd上的计算数据]
   * @return {[type]} [description]
   */
  initComputed () {
    let computed = this.$options.computed

    if (typeof computed === 'object')
      Object.keys(computed).forEach(key => {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: false,
          set () {}, //  computed上的数据不可赋值只能读取
          get: typeof computed[key] === 'function' ? computed[key] : computed.get
        })
      })
  }
/**
 * [proxyData 将data上的数据映射到Yue上]
 * @return {[type]} [description]
 */
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

  $mounted (el: string) {
    this.$el = el
    this.compile(this.$el)
  }

}
