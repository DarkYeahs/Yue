/*
*  @create Date:2017-10-16 Monday
*  @author: Yeahs
*  @email: yeahschen@gmail.com
*/
/**
 * [Dep Yue数据的观察类]
 * @return {[type]} [description]
 */
export default class Dep {
  subs: Array<any>;
  static target: any = null;
  static uid: number = 0;
  id: number;

  constructor () {
    Dep.uid++
    this.id = Dep.uid
  }
  /**
   * [addSub 添加订阅者]
   * @param  {[type]} sub [订阅者]
   */
  addSub (sub) {
    this.subs.push(sub)
  }

  depend () {
      Dep.target.addDep(this);
  }

  removeSub (sub) {
    let index = this.subs.indexOf(sub)
    if (index > -1) {
      this.subs.splice(index, 1)
    }
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
