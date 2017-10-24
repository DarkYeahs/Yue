export default class Dep {
  subs: Array<any>;
  static target: any = null;
  static uid: number = 0;
  id: number;

  constructor () {
    Dep.uid++
    this.id = Dep.uid
  }

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

  nofity () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
