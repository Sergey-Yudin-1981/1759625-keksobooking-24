import {createHotelNumber} from './data.js';
import {createElement} from './markup.js';

const note = createHotelNumber(10);

//console.log(createHotelNumber(10));

for (let i=0; i < note.length; i++) {
  //console.log(note[i]);

  const cardItem = createElement(note[i]);

  //console.log(cardItem);

  if (i === 0) {
    document.getElementById('map-canvas').append(cardItem);
  }

}
