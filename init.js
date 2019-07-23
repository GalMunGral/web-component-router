import LocationService from './LocationService.js';
import { BaseRouter, RouterLink } from './Router.js';

class Router extends BaseRouter {
  constructor() {
    super();
  }
  render(url) {
    if (!this.shadowRoot.hasChildNodes()) {
      let frame = document.createElement('iframe');
      frame.style.width = '100vw';
      this.shadowRoot.append(frame);
    }
    this.shadowRoot.firstChild.src = url
  }
}

customElements.define('router-root', Router)
customElements.define('router-link', RouterLink, { extends: 'a' });

window.locationService = new LocationService();
