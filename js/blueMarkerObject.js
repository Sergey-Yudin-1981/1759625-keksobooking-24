import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';
import {activatePopup} from './popup.js';

const blueIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function loadMap(map) {
  //console.log('загрузилось');
  fetch('https://24.javascript.pages.academy/keksobooking/data',
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Сервер не отвечает, повторите попытку позднее.');
    })
    .then((dataServer) => {
      //отображаем синие метки на карте
      for (let i=0; i < dataServer.length; i ++) {
        const lat = dataServer[i].location.lat;
        const lng = dataServer[i].location.lng;
        const markerBlue = L.marker(
          {
            lat,
            lng,
          },
          {
            icon: blueIcon,
          },
        );
        markerBlue
          .addTo(map)
          .bindPopup(fillHotelElement(dataServer[i], '#card'));
      }
      disableForm(['.map__filters'], false);
    })
    .catch(() => {
      activatePopup('serverError');
      disableForm(['.map__filters'], true);
    });
}

export {loadMap};
