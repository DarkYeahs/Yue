class Updater {

  textUpdater (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value
  }

  htmlUpdater (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  }

  classUpdater (node, value, oldValue) {
    let className = node.className
    className = className.replace(oldValue, '').replace(/\s$/, '')

    let space = className && String(value) ? ' ' : '' // 防止className为空及修改的className为空的情况下className为' '
    node.className = className + space + value
  }

  modelUpdater (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value
  }
}

export default new Updater()
