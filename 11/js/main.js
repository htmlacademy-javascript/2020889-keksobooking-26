import {renderPins} from './map.js';
import {getData} from './api.js';
import {allowSubmitForm} from './user-form.js';
import {startFilter, updateFilterHandler} from './form-filter.js';

allowSubmitForm();
getData(renderPins);
startFilter();
updateFilterHandler();
