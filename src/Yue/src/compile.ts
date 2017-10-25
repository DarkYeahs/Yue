/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import compileUtil from './util/CompileUtil'

export default class Compile {

  $el: string;
  $template: Element;
  $fragment: DocumentFragment;
  $vm: any;

  constructor (el, vm) {
    this.$el = el
    this.$vm = vm
    this.initTemplate()
    this.$fragment = this.createFragment()
    this.compileElement(this.$fragment)
    this.$template.appendChild(this.$fragment)
  }

  initTemplate () {
    if (this.$template === undefined) {
      let template: any = document.querySelector(this.$el) || new Element()
      this.$template = template
    }
  }

  createFragment () {
    let fragment = document.createDocumentFragment()
    let child

    while (child = this.$template.firstChild) fragment.appendChild(child)

    return fragment
  }

  compileElement (el) {
    let childNodes = el.childNodes;

    [].slice.call(childNodes).forEach(node => {
      let reg = /\{\{.*\}\}/
      let text = node.textContent
      let res = reg.exec(text)
      if (this.isElementNode(node)) this.compile(node)
      else if (this.isTextNode(node) && res) this.compileText(node, res[0].slice(2, -2))

      if (node.childNodes && node.childNodes.length > 0) this.compileElement(node)
    })
  }

  compile (node) {
    let nodeAttrs = node.attributes;

    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let exp = attr.value
        let dir = attrName.substring(2)

        if (this.isEventDirective(dir)) compileUtil.eventHandler(node, this.$vm, exp, dir)
        else compileUtil[dir] && compileUtil[dir](node, this.$vm, exp)

        node.removeAttribute(attrName)
      }
    })
  }

  compileText (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  }

  isElementNode (node) {
      return node.nodeType === 1;
  }

  isTextNode (node) {
      return node.nodeType === 3;
  }

  isDirective (attr) {
    return attr.indexOf('v-') === 0
  }

  isEventDirective (dir) {
    return dir.indexOf('on') === 0
  }
}
