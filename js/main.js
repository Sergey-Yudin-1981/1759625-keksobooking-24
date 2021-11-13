import {createHotelNumber} from './data.js';
import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';

const note = createHotelNumber(10);

//console.log(note);
//console.log(note[1].location.lat);

//вывод данных по объявлению (попап на карте)
// const cardItem = fillHotelElement(note[3], '#card');
// document.getElementById('map-canvas').append(cardItem);

//подключениме карты
let coordinatesLat = 35.68172;
let coordinatesLng = 139.75392;
const map = L.map('map-canvas');
map.setView({
  lat: coordinatesLat,
  lng: coordinatesLng,
}, 10);
//подключаем картографический сервис (для отображения карты)
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
//подключаем свой маркер
const redIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const blueIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const coordinatesInput = document.getElementById('address');
//добавляем маркер на карту
const markerRed = L.marker(
  {
    lat: coordinatesLat,
    lng: coordinatesLng,
  },
  {
    draggable: true,//перетакскивание маркера
    icon: redIcon,
  },
);
markerRed.addTo(map);

coordinatesInput.value = `${coordinatesLat}, ${coordinatesLng}`;
//отображение координат при перетаскивании маркера
markerRed.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  coordinatesLat = coordinates.lat.toFixed(5);
  coordinatesLng = coordinates.lng.toFixed(5);
  //Выводим координаты в поле ввода адреса
  coordinatesInput.value = `${coordinatesLat}, ${coordinatesLng}`;
});
//отображаем несколько меток синиго цвета
for (let i=0; i < note.length; i ++) {
  const lat = note[i].location.lat;
  const lng = note[i].location.lng;
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
    .bindPopup(fillHotelElement(note[i], '#card'));
}

//активное-неактивное состояние ввода данных
const data = ['.ad-form', '.map__filters'];
disableForm(data, true);
disableForm(data, false);

//Проверка ввода заголовка объявления
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

//Проверка ввода цены
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

//window.addEventListener('load', handleTypeChange);
typeNameInput.addEventListener('change', handleTypeChange);

priceNameInput.addEventListener('keyup', (evt) => {
  if (evt.target.value < priceNameInputMinValue || evt.target.value > priceNameInput.max) {
    evt.target.setCustomValidity(`Цена должна быть от ${ priceNameInputMinValue } до ${ priceNameInput.max }`);
  } else {
    priceNameInput.setCustomValidity('');
  }
  evt.target.reportValidity();
});

//когда меняется количество комнат
//->
//выбираем все варианты колиства гостей
//->
//ставим disabled вариантам гостей, большим, чем количество комнат
//->
//если комнат 100 - вручную оставляем активным только вариант не для гостей

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

//время заезда синхронизированно с временем выезда и наоборот
const timeInRoom = document.getElementById('timein');
const timeOutRoom = document.getElementById('timeout');
const timeInRoomOptions = timeInRoom.querySelectorAll('option');
const timeOutRoomOptions = timeOutRoom.querySelectorAll('option');

function arrivalTimeInOut(elementValue, roomOptions) {
  roomOptions.forEach((optionTime) => {
    optionTime.selected = elementValue === optionTime.value;
    // if (elementValue === optionTime.value) {
    //   optionTime.selected = true;
    // }
  });
}
timeInRoom.addEventListener('change', () => { arrivalTimeInOut(timeInRoom.value, timeOutRoomOptions);});
timeOutRoom.addEventListener('change', () => { arrivalTimeInOut(timeOutRoom.value, timeInRoomOptions);});
