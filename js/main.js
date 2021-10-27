import {createHotelNumber} from './data.js';
import {fillHotelElement} from './markup.js';

const note = createHotelNumber(10);

//console.log(createHotelNumber(10));

const cardItem = fillHotelElement(note[3], '#card');
document.getElementById('map-canvas').append(cardItem);
