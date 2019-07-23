export default class LocationService {
  constructor() {
    this._path = window.location.pathname;
    this.observers = [];
    Object.defineProperty(this, 'path', {
      get() {
        return this._path
      },
      set(val) {
        this._path = val;
        this.observers.forEach(obs => {
          obs.updateLocation(val);
        })
      }
    })
  }

  subscribe(observer) {
    this.observers.push(observer);
    observer.updateLocation(this.path); // Notify immediately
  }

  goto(path) {
    this.path = path;
    window.history.pushState(null, 'test', path);
  }
}
