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
      console.log(this.$template)
    }
  }

  compileElement (el) {
    let childNodes = el.childNodes
    let me = this;
    [].slice.call(childNodes).forEach(node => {
      let reg = /\{\{.*\}\}/
      let text = node.textContent

      if (me.isElementNode(node)) {

      }
      else if (me.isTextNode(node) && reg.test(text)) {

      }
      else if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
    let reg = /\{\{.*\}\}/
  }

  compile () {

  }

  createFragment () {
    let fragment = document.createDocumentFragment()
    let child

    while (child = this.$template.firstChild) {
      fragment.appendChild(child)
    }

    return fragment
  }

  isElementNode (node) {
      return node.nodeType === 1;
  }

  isTextNode (node) {
      return node.nodeType === 3;
  }
}
