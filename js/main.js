import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';
import {activatePopup} from './popup.js';
import {fetchedData} from './fetchHotelsData.js';

const COORDINATES_LAT = 35.68172;
const COORDINATES_LNG = 139.75392;
const map = L.map('map-canvas');
const redIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

async function getHotelsData() {
  try {
    const response = await fetchedData;
    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    activatePopup('serverError');
    disableForm(['.map__filters'], true);
  }
}

let blueBaloons = [];

function showBaloon(dataToShow, mapInstance) {
  const baloon = L.marker(
    {
      lat: dataToShow.location.lat,
      lng: dataToShow.location.lng,
    },
    {
      icon: L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    },
  )
    .addTo(mapInstance)
    .bindPopup(fillHotelElement(dataToShow, '#card'));
  blueBaloons.push(baloon);
}

function removeBaloons() {
  for (const baloon of blueBaloons) {
    baloon.remove();
  }
  blueBaloons = [];
}

let hotelsData = {};

async function renderBaloons() {
  hotelsData = await getHotelsData();
  if (!hotelsData) {
    return false;
  }
  const slicedHotelsArr = hotelsData.slice(0, 10);
  slicedHotelsArr.forEach((el) => {
    showBaloon(el, map);
  });
  disableForm(['.map__filters'], false);
}

map.on('load', () => {
  renderBaloons();
});

map.setView({
  lat: COORDINATES_LAT,
  lng: COORDINATES_LNG,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const coordinatesInput = document.getElementById('address');
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
markerRed.addTo(map);

coordinatesInput.value = `${COORDINATES_LAT}, ${COORDINATES_LNG}`;
markerRed.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  const currentLat = coordinates.lat.toFixed(5);
  const currentLng = coordinates.lng.toFixed(5);
  //Выводим координаты в поле ввода адреса
  coordinatesInput.value = `${currentLat}, ${currentLng}`;
});

const filterValues = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

function updateFilterValues () {
  const mapWrapper = document.querySelector('.map__filters');

  filterValues.type = mapWrapper.querySelector('#housing-type').value;
  filterValues.price = mapWrapper.querySelector('#housing-price').value;
  filterValues.rooms = mapWrapper.querySelector('#housing-rooms').value;
  filterValues.guests = mapWrapper.querySelector('#housing-guests').value;

  filterValues.features = [...mapWrapper.querySelectorAll('.map__features input:checked')]
    .map((el) => el.getAttribute('value'));

  const filterType = hotelsData.filter(({offer}) => filterValues.type === 'any' || offer.type === filterValues.type);

  const filterPrice = filterType.filter(({offer}) => {
    if (filterValues.price === 'any') {
      return true;
    }
    if (filterValues.price === 'low') {
      return offer.price < 10000;
    }
    if (filterValues.price === 'middle') {
      return (offer.price >= 10000) && (offer.price <= 50000);
    }
    if (filterValues.price === 'high') {
      return offer.price > 50000;
    }
    return false;
  });
  const filterRooms = filterPrice.filter(({offer}) => {
    if (filterValues.rooms === 'any') {
      return true;
    }
    return offer.rooms === Number(filterValues.rooms);
  });
  const filterGuest = filterRooms.filter(({offer}) => {
    if (filterValues.guests === 'any') {
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
  const result = filterFeatures.slice(0, 10);
  removeBaloons();
  for (const item of result) {
    showBaloon(item, map);
  }
}

(function() {
  for (const input of document.querySelectorAll('.map__filters select, .map__filters input')) {
    input.addEventListener('change', updateFilterValues);
  }
})();

const data = ['.ad-form', '.map__filters'];
disableForm(data, true);
map.whenReady(() => {
  disableForm(['.ad-form'], false);
});

const MIN_HEADING_LENGTH = 30;
const MAX_HEADING_LENGTH = 100;
const headingNameInput = document.getElementById('title');

headingNameInput.addEventListener('input', () => {
  const valueLength = headingNameInput.value.length;

  if (valueLength < MIN_HEADING_LENGTH) {
    headingNameInput.setCustomValidity(`Ещё ${  MIN_HEADING_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_HEADING_LENGTH) {
    headingNameInput.setCustomValidity(`Удалить ${  valueLength - MAX_HEADING_LENGTH } симв. Максимальное количество ${ MAX_HEADING_LENGTH } симв.`);
  } else {
    headingNameInput.setCustomValidity('');
  }

  headingNameInput.reportValidity();
});

const priceNameInput = document.getElementById('price');
const typeNameInput = document.getElementById('type');

const priceMinTable = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

let priceNameInputMinValue = priceNameInput.min;

function handleTypeChange() {
  if (!priceNameInput || !typeNameInput) {
    return false;
  }
  priceNameInputMinValue = priceMinTable[typeNameInput.value] ? priceMinTable[typeNameInput.value] : 0;
  priceNameInput.setAttribute('min', priceNameInputMinValue);
}

typeNameInput.addEventListener('change', handleTypeChange);

priceNameInput.addEventListener('keyup', (evt) => {
  if (Number(evt.target.value) < priceNameInputMinValue || Number(evt.target.value) > priceNameInput.max) {
    evt.target.setCustomValidity(`Цена должна быть от ${ priceNameInputMinValue } до ${ priceNameInput.max }`);
  } else {
    priceNameInput.setCustomValidity('');
  }
  evt.target.reportValidity();
});


const roomNumberSelect = document.getElementById('room_number');
const guestsNumberSelect = document.getElementById('capacity');
const guestsNumberOptions = guestsNumberSelect.querySelectorAll('option');
const maxRooms = 100;

function handleRoomsChange() {
  const currentValue = Number(roomNumberSelect.value);

  guestsNumberOptions.forEach((option) => {
    if (currentValue === maxRooms) {
      option.disabled = Number(option.value) < currentValue;
      option.selected = !Number(option.value) < currentValue;
    } else {
      option.disabled = Number(option.value) > currentValue;
      option.selected = !Number(option.value) > currentValue;
    }
  });
}

window.addEventListener('load', handleRoomsChange);
roomNumberSelect.addEventListener('change', handleRoomsChange);

const timeInRoom = document.getElementById('timein');
const timeOutRoom = document.getElementById('timeout');
const timeInRoomOptions = timeInRoom.querySelectorAll('option');
const timeOutRoomOptions = timeOutRoom.querySelectorAll('option');

function arrivalTimeInOut(elementValue, roomOptions) {
  roomOptions.forEach((optionTime) => {
    optionTime.selected = elementValue === optionTime.value;
  });
}
timeInRoom.addEventListener('change', () => { arrivalTimeInOut(timeInRoom.value, timeOutRoomOptions);});
timeOutRoom.addEventListener('change', () => { arrivalTimeInOut(timeOutRoom.value, timeInRoomOptions);});

function resetForm() {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();

  map.setView({
    lat: COORDINATES_LAT,
    lng: COORDINATES_LNG,
  }, 10);

  markerRed.setLatLng({
    lat: COORDINATES_LAT,
    lng: COORDINATES_LNG,
  });

  document.querySelector('.leaflet-popup-close-button') && document.querySelector('.leaflet-popup-close-button').click();
  updateFilterValues();
}

const formNode = document.querySelector('.ad-form');

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
const typeHouse = document.getElementById('housing-type');

function typeHouseChange() {

}

typeHouse.addEventListener('change', typeHouseChange);
