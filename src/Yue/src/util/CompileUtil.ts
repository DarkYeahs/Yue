/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import updater from './Updater'
import Watcher from '../watcher'

/**
 * [CompileUtil 编译工具类]
 */
class CompileUtil {

  /**
   * [text 文本编译]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   */
  text (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  }

  /**
   * [html html节点编译]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   */
  html (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  }

  /**
   * [class className编译]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   */
  className (node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  }

  /**
   * [model v-model编译]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   */
  model (node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    let val = this._getVMVal(vm, exp)
    //  监听input事件响应输入值的变化
    node.addEventListener('input', e => {
      let newValue = e.target.value
      if (val === newValue) return

      this._setVMVal(vm, exp, newValue)
      val = newValue
    })
  }
  /**
   * [bind 编译基础函数]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   * @param  {[type]} dir  [编译函数前缀]
   */
  bind (node, vm, exp, dir) {
    //  获取相应的更新工具函数
    let updaterFn = updater[dir + 'Updater']

    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
    // 对该数据建立观察
    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue)
    })
  }

  /**
   * [eventHandler 处理绑定事件转成dom上的绑定事件]
   * @param  {[type]} node [传入的node节点]
   * @param  {[type]} vm   [Yue对象]
   * @param  {[type]} exp  [key值]
   * @param  {[type]} dir  [编译函数前缀]
   */
  eventHandler (node, vm, exp, dir) {
    let dirs = dir.split(':')
    let eventType = dirs && dirs[1]
    let fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) node.addEventListener(eventType. fn.bind(vm), false)
  }

  /**
   * [_getVMVal 获取数据]
   * @param  {[type]} vm  [Yue对象]
   * @param  {[type]} exp [key值]
   * @return {[type]}     [返回对应key值的数据]
   */
  _getVMVal(vm, exp) {
    let val = vm
    let exps = exp.split('.')
    let len = exps.length
    for (let i = 0; i < len; i++) {
      let item = exps[i]
      val = val[item]
    }
    return val
  }

/**
 * [_setVMVal 设置相应的key值为传入的value]
 * @param  {[type]} vm    [Yue对象]
 * @param  {[type]} exp   [key值]
 * @param  {[type]} value [传入的新值]
 */
  _setVMVal (vm, exp, value) {
    let val = vm
    let exps = exp.split('.')
    let len = exps.length - 1
    for (let i = 0; i < len; i++) {
      let item = exps[i]
      val = val[item]
    }
    val[exps[len]] = value
  }
}

export default new CompileUtil()
