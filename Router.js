export class BaseRouter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [ 'path' ];
  }
  
  updateLocation(newPath) {
    this.setAttribute('path', newPath);
  }

  connectedCallback() {
    window.addEventListener('load', () => {
      window.locationService.subscribe(this);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'path') {
      let url = newValue;
      this.render(url);
    }
  }

  // To be implemented by subclasses
  render(url) {
    this.shadowRoot.innerHTML = url
  }
}

export class RouterLink extends HTMLAnchorElement {
  constructor() {
    super();
    this.onclick = e => {
      e.preventDefault(); // Don't load new page
      let url = this.getAttribute('href');
      window.locationService.goto(url);
    }
  }
}