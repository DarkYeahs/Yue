let uid = 0

export default class Dep {
  id:number = uid++
  subs: Array<any>;
  target:any = null

  addSub (sub) {
    this.subs.push(sub)
  }

  depend () {
      this.target.addDep(this);
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
