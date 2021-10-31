import {createHotelNumber} from './data.js';
import {fillHotelElement} from './markup.js';
import {activeOff} from './action-on-off.js';

const note = createHotelNumber(10);

//console.log(createHotelNumber(10));

const cardItem = fillHotelElement(note[3], '#card');
document.getElementById('map-canvas').append(cardItem);

activeOff('.ad-form', '.map__filters');
