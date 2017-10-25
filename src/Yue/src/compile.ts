/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/

import compileUtil from './util/CompileUtil'
/**
 * [constructor 编译类]
 * @param  {[type]} $el [挂靠dom的id值]
 * @param  {[type]} $vm [Yue对象]
 * @param  {[type]} $fragment [创建的文档碎片]
 * @param  {[type]} $template [虚拟dom模版]
 */
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
  /**
   * [initTemplate 初始化template]
   */
  initTemplate () {
    if (this.$template === undefined) {
      let template: any = document.querySelector(this.$el) || new Element()
      this.$template = template
    }
  }

  /**
   * [createFragment 创建文档碎片]
   * @return {[type]} [返回创建的文档碎片]
   */
  createFragment () {
    let fragment = document.createDocumentFragment()
    let child

    while (child = this.$template.firstChild) fragment.appendChild(child)

    return fragment
  }

  /**
   * [compileElement 编译template]
   * @param  {[type]} el [template]
   */
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

  /**
   * [compile 编译dom节点]
   * @param  {[type]} node [dom节点]
   */
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

  /**
   * [compileText 编译文本节点]
   * @param  {[type]} node [文本节点]
   * @param  {[type]} exp  [key值]
   */
  compileText (node, exp) {
    compileUtil.text(node, this.$vm, exp)
  }

  /**
   * [isElementNode 判断是否为dom节点]
   * @param  {[type]} node [dom节点]
   * @return {[type]}      [返回判断结果]
   */
  isElementNode (node) {
      return node.nodeType === 1;
  }

  /**
   * [isTextNode 判断是否为文本节点]
   * @param  {[type]} node [dom节点]
   * @return {[type]}      [返回判断结果]
   */
  isTextNode (node) {
      return node.nodeType === 3;
  }

  /**
   * [isDirective 判断是否为指令]
   * @param  {[type]} dir [attr名]
   * @return {[type]}     [返回判断结果]
   */
  isDirective (attr) {
    return attr.indexOf('v-') === 0
  }

/**
 * [isEventDirective 判断是否为事件指令]
 * @param  {[type]} dir [attr名]
 * @return {[type]}     [返回判断结果]
 */
  isEventDirective (dir) {
    return dir.indexOf('on') === 0
  }
}
