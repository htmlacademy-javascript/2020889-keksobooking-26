import './user-form.js';
import './map.js';
import './api.js';

import {renderMarkers, initMap} from './map.js';
import {getData} from './api.js';
import {allowSubmitForm, toggleFormFromEnabled} from './user-form.js';

toggleFormFromEnabled(true);
allowSubmitForm();
initMap(toggleFormFromEnabled);

getData(renderMarkers);
