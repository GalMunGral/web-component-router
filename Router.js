class Router extends HTMLElement {
  static _instance = null;
  static _pendingResolvers = [];
  static path = '/';
  
  static get instance() {
    if (this._instance) {
      return Promise.resolve(this._instance);
    }
    let promise = new Promise((resolve, reject) => {
      this._pendingResolvers.push(resolve);
    });
    return promise;
  }
  
  static set instance(node) {
    this._instance = node;
    this._pendingResolvers.forEach((resolve) => {
      resolve(node);
    })
  }

  static updatePath(path) {
    this._path = path;
    window.history.pushState(null, 'test', path);
    if (this._instance) {
      this._instance.load(path);
    }
  }

  constructor() {
    super();
    if (Router._instance) {
      console.warn('You have multiple `router-root` instances. Only the first one will be used');
      return;
    }
    this.attachShadow({ mode: 'open' });
    Router._instance = this;
    this.routes = new Map();
    for (let element of this.children) {
      let path = element.getAttribute('path');
      this.routes.set(path, element);
    }
    Router.path = this.getAttribute('default');
    this.load(Router.path);
  }

  load(path) {
    if (this.routes.has(path)) {
      let activeElement = this.routes.get(path);
      for (let el of this.shadowRoot.children) {
        this.shadowRoot.removeChild(el);
      }
      this.shadowRoot.append(activeElement);
    }
  }
}
customElements.define('router-switch', Router);

class RouterLink extends HTMLElement {
  constructor() {
    super();
    this.path = this.getAttribute('href');
    this.onclick = () => {
      Router.updatePath(this.path);
    }    
  }
}
customElements.define('router-link', RouterLink);
