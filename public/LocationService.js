export default class LocationService {
  constructor() {
    this._path = window.location.pathname;
    Object.defineProperty(this, 'path', {
      get() { return this._path },
      set(val) {
        this._path = val;
        this.observers.forEach(ob => {
          ob.updateLocation(val);
        })
      }
    })
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
    observer.updateLocation(this.path); // Notify immediately
  }

  goTo(path) {
    this.path = path;
    window.history.pushState(null, 'test', path);
  }
}
