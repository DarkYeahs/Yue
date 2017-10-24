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

    this.$observer = new Observer(this.$data)
    if (this.$el) this.compile(this.$el)
  }

  compile (el: string) {
    this.$compile = new Compile(el, this)
  }

  mounted (el: string) {
    this.$el = el
    this.compile(this.$el)
  }
}
