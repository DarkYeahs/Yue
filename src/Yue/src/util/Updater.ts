/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/
/**
 * [textUpdater 数据更新工具类]
 */
class Updater {

/**
 * [textUpdater 文本节点更新函数]
 * @param  {[type]} node  [文本节点]
 * @param  {[type]} value [更新值]
 */
  textUpdater (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  }

  /**
   * [htmlUpdater html节点更新函数]
   * @param  {[type]} node  [dom节点]
   * @param  {[type]} value [更新值]
   */
  htmlUpdater (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  }

  /**
   * [classUpdater className更新函数]
   * @param  {[type]} node  [dom节点]
   * @param  {[type]} value [更新值]
   */
  classUpdater (node, value, oldValue) {
    let className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')

    let space = className && String(value) ? ' ' : '' // 防止className为空及修改的className为空的情况下className为' '
    node.className = className + space + value
  }

  /**
   * [modelUpdater model更新函数]
   * @param  {[type]} node  [dom节点]
   * @param  {[type]} value [更新值]
   */
  modelUpdater (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value
  }
}

export default new Updater()
