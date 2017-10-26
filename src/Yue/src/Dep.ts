/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/
/**
 * [Dep Yue数据的发布类]
 * @param  {[type]} subs [订阅者队列]
 * @param  {[type]} target [当前订阅对象]
 * @param  {[type]} uid [静态id]
 * @param  {[type]} id [dep对象id]
 */
export default class Dep {
  subs: Array<any>;
  static target: any = null;
  static uid: number = 0;
  id: number;

  constructor () {
    Dep.uid++
    this.id = Dep.uid
    this.subs = []

  }
  /**
   * [addSub 添加订阅者]
   * @param  {[type]} sub [订阅者]
   */
  addSub (sub) {
    this.subs.push(sub)
  }

  /**
   * [depend 缓存当前的订阅对象，并判断当前订阅对象是否定订阅该发布者，否的话将其加入订阅队列中]
   */
  depend () {
      Dep.target.addDep(this);
  }

  /**
   * [removeSub 移除订阅者]
   * @param  {[type]} sub [订阅者]
   */
  removeSub (sub) {
    let index = this.subs.indexOf(sub)
    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }

  /**
   * [notify 通知订阅者进行数据更新]
   */
  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
