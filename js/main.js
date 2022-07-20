import {renderPins} from './map.js';
import {getData} from './api.js';
import {allowSubmitForm} from './user-form.js';
import './data.js';
import './generating-similar-elements.js';

allowSubmitForm();
getData(renderPins);
