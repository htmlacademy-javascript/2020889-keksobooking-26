import {renderMarkers} from './map.js';
import {getData} from './api.js';
import {allowSubmitForm} from './user-form.js';

allowSubmitForm();
getData(renderMarkers);
