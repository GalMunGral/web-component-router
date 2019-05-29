export class Router extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [ 'path' ];
  }
  
  connectedCallback() {
    window.addEventListener('load', () => {
      window.locationService.subscribe(this);
      let template = document.querySelector('#main-template').content.cloneNode(true);
      this.shadowRoot.append(template);
      let path = this.getAttribute('path');
      this.attributeChangedCallback('path', null, path);
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let main = this.shadowRoot.querySelector('#main');
    let color = newValue.slice(1);
    if (main && name === 'path') {
      main.style.background = `linear-gradient(white -50%, ${color} 200%)`;
    }
  }

  updateLocation(newPath) {
    this.setAttribute('path', newPath);
  }
}

export class RouterLink extends HTMLAnchorElement {
  constructor() {
    super();
    this.onclick = e => {
      e.preventDefault(); // Don't load new page
      window.locationService.goTo(this.getAttribute('href'));
    }
  }
}