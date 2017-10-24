export default class Watcher {
  $vm:any;
  $cb: any;
  $expOrFn: any;
  $depIds: any;

  constructor (vm, expOrFn, cb) {
    this.$cb = cb
    this.$vm = vm
    this.$expOrFn = expOrFn
    this.$depIds = {}
  }
}
