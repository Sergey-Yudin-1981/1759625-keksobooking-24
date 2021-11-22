import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';
import {activatePopup} from './popup.js';
import {fetchedData} from './fetchHotelsData.js';

const PRICEBUNGALOW = 0;
const PRICEFLAT = 1000;
const PRICEHOTEL = 3000;
const PRICEHOUSE = 5000;
const PRICEPALASE = 10000;
const typeHouses = {
  bungalow: 'bungalow',
  flat: 'flat',
  hotel: 'hotel',
  house: 'house',
  palace: 'palace',
};
const priceHouses = {
  any: 'any',
  middle: 'middle',
  low: 'low',
  high: 'high',
};
const roomsHouses = 'any';
const guestHouses = 'any';
const filterValuesGeneral = 'any';
const NUMBERELEMENTS = 10;
const MIDDLEPRICE = 50000;
const LOWPRICE = 10000;
const COORDINATES_LAT = 35.68172;
const COORDINATES_LNG = 139.75392;
const coordinatesInputNode = document.getElementById('address');
const map = L.map('map-canvas');
const SIZEREDICON = 52;
const REDICONCENTER = 26;
const redIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [SIZEREDICON, SIZEREDICON],
  iconAnchor: [REDICONCENTER, SIZEREDICON],
});
const SIZEBLUEICON = 40;
const BLUEICONCENTER = 20;
const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};
const MIN_HEADING_LENGTH = 30;
const MAX_HEADING_LENGTH = 100;
const headingNameInputNode = document.getElementById('title');
const data = ['.ad-form', '.map__filters'];
const priceNameInputNode = document.getElementById('price');
const typeNameInputNode = document.getElementById('type');
const priceMinTable = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const roomNumberSelectNode = document.getElementById('room_number');
const guestsNumberSelectNode = document.getElementById('capacity');
const guestsNumberOptions = guestsNumberSelectNode.querySelectorAll('option');
const MAXROOMS = 100;
const timeInRoomNode = document.getElementById('timein');
const timeOutRoomNode = document.getElementById('timeout');
const timeInRoomOptions = timeInRoomNode.querySelectorAll('option');
const timeOutRoomOptions = timeOutRoomNode.querySelectorAll('option');
const formNode = document.querySelector('.ad-form');
const markerRed = L.marker(
  {
    lat: COORDINATES_LAT,
    lng: COORDINATES_LNG,
  },
  {
    draggable: true,//перетакскивание маркера
    icon: redIcon,
  },
);


const getHotelsData = async () => {
  try {
    const response = await fetchedData;
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    activatePopup('serverError');
    disableForm(['.map__filters'], true);
  }
};

let blueBaloons = [];

const showBaloon = (dataToShow, mapInstance) => {
  const baloon = L.marker(
    {
      lat: dataToShow.location.lat,
      lng: dataToShow.location.lng,
    },
    {
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [SIZEBLUEICON, SIZEBLUEICON],
        iconAnchor: [BLUEICONCENTER, SIZEBLUEICON],
      }),
    },
  )
    .addTo(mapInstance)
    .bindPopup(fillHotelElement(dataToShow, '#card'));
  blueBaloons.push(baloon);
};

const removeBaloons = () => {
  blueBaloons.forEach((baloon) => {
    baloon.remove();
  });
  blueBaloons = [];
};

let hotelsData = {};

const renderBaloons = async () => {
  hotelsData = await getHotelsData();
  if (!hotelsData) {
    return false;
  }
  const slicedHotelsArr = hotelsData.slice(0, NUMBERELEMENTS);
  slicedHotelsArr.forEach((el) => {
    showBaloon(el, map);
  });
  disableForm(['.map__filters'], false);
};

map.on('load', () => {
  renderBaloons();
});

map.setView({
  lat: COORDINATES_LAT,
  lng: COORDINATES_LNG,
}, NUMBERELEMENTS);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

markerRed.addTo(map);

coordinatesInputNode.value = `${COORDINATES_LAT}, ${COORDINATES_LNG}`;
markerRed.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  const currentLat = coordinates.lat.toFixed(5);
  const currentLng = coordinates.lng.toFixed(5);
  //Выводим координаты в поле ввода адреса
  coordinatesInputNode.value = `${currentLat}, ${currentLng}`;
});

const updateFilterValues = () => {
  const mapWrapper = document.querySelector('.map__filters');

  filterValues.type = mapWrapper.querySelector('#housing-type').value;
  filterValues.price = mapWrapper.querySelector('#housing-price').value;
  filterValues.rooms = mapWrapper.querySelector('#housing-rooms').value;
  filterValues.guests = mapWrapper.querySelector('#housing-guests').value;

  filterValues.features = [...mapWrapper.querySelectorAll('.map__features input:checked')]
    .map((el) => el.getAttribute('value'));

  const filterType = hotelsData.filter(({offer}) => filterValues.type === filterValuesGeneral || offer.type === filterValues.type);

  const filterPrice = filterType.filter(({offer}) => {
    if (filterValues.price === priceHouses.any) {
      return true;
    }
    if (filterValues.price === priceHouses.low) {
      return offer.price < LOWPRICE;
    }
    if (filterValues.price === priceHouses.middle) {
      return (offer.price >= LOWPRICE) && (offer.price <= MIDDLEPRICE);
    }
    if (filterValues.price === priceHouses.high) {
      return offer.price > MIDDLEPRICE;
    }
    return false;
  });
  const filterRooms = filterPrice.filter(({offer}) => {
    if (filterValues.rooms === roomsHouses) {
      return true;
    }
    return offer.rooms === Number(filterValues.rooms);
  });
  const filterGuest = filterRooms.filter(({offer}) => {
    if (filterValues.guests === guestHouses) {
      return true;
    }
    return offer.guests === Number(filterValues.guests);
  });
  const filterFeatures = filterGuest.filter(({offer}) => {
    if (filterValues.features.length === 0) {
      return true;
    }
    for (const feature of filterValues.features) {
      if (!offer.features || !offer.features.includes(feature)) {
        return false;
      }
    }
    return true;
  });
  const result = filterFeatures.slice(0, NUMBERELEMENTS);
  removeBaloons();
  result.forEach((item) => {
    showBaloon(item, map);
  });
};

(() => {
  const filterInputNodes = document.querySelectorAll('.map__filters select, .map__filters input');
  filterInputNodes.forEach((input) => {
    input.addEventListener('change', updateFilterValues);
  });
})();

disableForm(data, true);
map.whenReady(() => {
  disableForm(['.ad-form'], false);
});

headingNameInputNode.addEventListener('input', () => {
  const valueLength = headingNameInputNode.value.length;

  if (valueLength < MIN_HEADING_LENGTH) {
    headingNameInputNode.setCustomValidity(`Ещё ${  MIN_HEADING_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_HEADING_LENGTH) {
    headingNameInputNode.setCustomValidity(`Удалить ${  valueLength - MAX_HEADING_LENGTH } симв. Максимальное количество ${ MAX_HEADING_LENGTH } симв.`);
  } else {
    headingNameInputNode.setCustomValidity('');
  }

  headingNameInputNode.reportValidity();
});

let priceNameInputMinValue = priceNameInputNode.min;

const handleTypeChange = () => {
  if (!priceNameInputNode || !typeNameInputNode) {
    return false;
  }
  priceNameInputMinValue = priceMinTable[typeNameInputNode.value] ? priceMinTable[typeNameInputNode.value] : 0;
  priceNameInputNode.setAttribute('min', priceNameInputMinValue);
};

typeNameInputNode.addEventListener('change', handleTypeChange);

priceNameInputNode.addEventListener('keyup', (evt) => {
  if (Number(evt.target.value) < priceNameInputMinValue || Number(evt.target.value) > priceNameInputNode.max) {
    evt.target.setCustomValidity(`Цена должна быть от ${ priceNameInputMinValue } до ${ priceNameInputNode.max }`);
  } else {
    priceNameInputNode.setCustomValidity('');
  }
  evt.target.reportValidity();
});

const handleRoomsChange = () => {
  const currentValue = Number(roomNumberSelectNode.value);

  guestsNumberOptions.forEach((option) => {
    if (currentValue === MAXROOMS) {
      option.disabled = Number(option.value) < currentValue;
      option.selected = !Number(option.value) < currentValue;
    } else {
      option.disabled = Number(option.value) > currentValue;
      option.selected = !Number(option.value) > currentValue;
    }
  });
};

const loadDefaultRooms = () => {
  handleRoomsChange();
};

const changeRoomValue = () => {
  handleRoomsChange();
};

window.addEventListener('load', loadDefaultRooms);

const changePrice =  () => {
  switch (typeNameInputNode.value) {
    case typeHouses.bungalow:
      priceNameInputNode.placeholder = PRICEBUNGALOW;
      break;
    case typeHouses.flat:
      priceNameInputNode.placeholder = PRICEFLAT;
      break;
    case typeHouses.hotel:
      priceNameInputNode.placeholder = PRICEHOTEL;
      break;
    case typeHouses.house:
      priceNameInputNode.placeholder = PRICEHOUSE;
      break;
    default:
      priceNameInputNode.placeholder = PRICEPALASE;
  }
};
typeNameInputNode.addEventListener('change', changePrice);

roomNumberSelectNode.addEventListener('change', changeRoomValue);

const arrivalTimeInOut = (elementValue, roomOptions) => {
  roomOptions.forEach((optionTime) => {
    optionTime.selected = elementValue === optionTime.value;
  });
};
timeInRoomNode.addEventListener('change', () => { arrivalTimeInOut(timeInRoomNode.value, timeOutRoomOptions);});
timeOutRoomNode.addEventListener('change', () => { arrivalTimeInOut(timeOutRoomNode.value, timeInRoomOptions);});

const resetForm = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();

  map.setView({
    lat: COORDINATES_LAT,
    lng: COORDINATES_LNG,
  }, NUMBERELEMENTS);

  markerRed.setLatLng({
    lat: COORDINATES_LAT,
    lng: COORDINATES_LNG,
  });

  document.querySelector('.leaflet-popup-close-button') && document.querySelector('.leaflet-popup-close-button').click();
  updateFilterValues();
};

formNode.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(formNode);
  fetch(formNode.getAttribute('action'),
    {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        activatePopup('success');
        resetForm();
      }
      throw new Error('Ошибка отправки данных');
    })
    .catch(() => {
      activatePopup('error');
    });
});
