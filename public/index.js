import LocationService from './LocationService.js';
import { Router, RouterLink } from './Router.js';

window.locationService = new LocationService();

customElements.define('router-root', Router)
customElements.define('router-link', RouterLink, { extends: 'a' });
