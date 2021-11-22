import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';
import {activatePopup} from './popup.js';
import {fetchedData} from './fetchHotelsData.js';
import {debounce} from './utils/debounce.js';

const typeHouses = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const priceHouses = {
  any: 'any',
  middle: 'middle',
  low: 'low',
  high: 'high',
};
const DEFAULT_VALUE = 'any';
const NUMBER_ELEMENTS = 10;
const MIDDLE_PRICE = 50000;
const LOW_PRICE = 10000;
const COORDINATES_LAT = 35.68172;
const COORDINATES_LNG = 139.75392;
const coordinatesInputNode = document.getElementById('address');
const map = L.map('map-canvas');
const SIZE_RED_ICON = 52;
const RED_ICON_CENTER = 26;
const redIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [SIZE_RED_ICON, SIZE_RED_ICON],
  iconAnchor: [RED_ICON_CENTER, SIZE_RED_ICON],
});
const SIZE_BLUE_ICON = 40;
const BLUE_ICON_CENTER = 20;
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
const MAX_ROOMS = 100;
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
        iconSize: [SIZE_BLUE_ICON, SIZE_BLUE_ICON],
        iconAnchor: [BLUE_ICON_CENTER, SIZE_BLUE_ICON],
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
  const slicedHotelsArr = hotelsData.slice(0, NUMBER_ELEMENTS);
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
}, NUMBER_ELEMENTS);

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

  const filterType = hotelsData.filter(({offer}) => filterValues.type === DEFAULT_VALUE || offer.type === filterValues.type);

  const filterPrice = filterType.filter(({offer}) => {
    if (filterValues.price === priceHouses.any) {
      return true;
    }
    if (filterValues.price === priceHouses.low) {
      return offer.price < LOW_PRICE;
    }
    if (filterValues.price === priceHouses.middle) {
      return (offer.price >= LOW_PRICE) && (offer.price <= MIDDLE_PRICE);
    }
    if (filterValues.price === priceHouses.high) {
      return offer.price > MIDDLE_PRICE;
    }
    return false;
  });
  const filterRooms = filterPrice.filter(({offer}) => {
    if (filterValues.rooms === DEFAULT_VALUE) {
      return true;
    }
    return offer.rooms === Number(filterValues.rooms);
  });
  const filterGuest = filterRooms.filter(({offer}) => {
    if (filterValues.guests === DEFAULT_VALUE) {
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
  return filterFeatures;
};

const renderFilterredBaloons = (baloonsArray) => {
  removeBaloons();
  baloonsArray.slice(0, NUMBER_ELEMENTS).forEach((item) => {
    showBaloon(item, map);
  });
};

const bindFiltersChange = (cb) => {
  const filterInputNodes = document.querySelectorAll('.map__filters select, .map__filters input');
  filterInputNodes.forEach((input) => {
    input.addEventListener('change', () => {
      const filteredData = updateFilterValues();
      cb(filteredData);
    });
  });
};

bindFiltersChange(debounce((filteredData) => {
  renderFilterredBaloons(filteredData);
}));

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
    if (currentValue === MAX_ROOMS) {
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
  priceNameInputNode.placeholder = typeHouses[typeNameInputNode.value];
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
  }, NUMBER_ELEMENTS);

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
        return false;
      }
      throw new Error('Ошибка отправки данных');
    })
    .catch(() => {
      activatePopup('error');
    });
});
