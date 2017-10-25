/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import updater from './Updater'
import Watcher from '../watcher'

class CompileUtil {

  text (node, vm, exp) {
    console.log(exp)
    this.bind(node, vm, exp, 'text')
  }

  html (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  }

  className (node, vm, exp) {
    this.bind(node, vm, exp, 'class')
  }

  model (node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    let val = this._getVMVal(vm, exp)

    node.addEventListener('input', e => {
      let newValue = e.target.value
      if (val === newValue) return

      this._setVMVal(vm, exp, newValue)
      val = newValue
    })
  }

  bind (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater']

    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue)
    })
  }

  eventHandler (node, vm, exp, dir) {
    let dirs = dir.split(':')
    let eventType = dirs && dirs[1]
    let fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) node.addEventListener(eventType. fn.bind(vm), false)
  }

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
