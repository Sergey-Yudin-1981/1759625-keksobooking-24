import {createHotelNumber} from './data.js';
import {fillHotelElement} from './markup.js';
import {disableForm} from './action-on-off.js';

const note = createHotelNumber(10);

//console.log(createHotelNumber(10));

const cardItem = fillHotelElement(note[3], '#card');
document.getElementById('map-canvas').append(cardItem);

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
//const MIN_PRICE_LENGTH = 0;
const MAX_PRICE_LENGTH = 1000000;
const priceNameInput = document.getElementById('price');
const typeNameInput = document.getElementById('type');

const priceMinTable = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

let priceNameInputMinValue = 0;

function handleTypeChange() {
  if (!priceNameInput || !typeNameInput) {
    return false;
  }
  priceNameInputMinValue = priceMinTable[typeNameInput.value] ? priceMinTable[typeNameInput.value] : 0;
  priceNameInput.setAttribute('min', priceNameInputMinValue);
}

window.addEventListener('load', handleTypeChange);
typeNameInput.addEventListener('change', handleTypeChange);

priceNameInput.addEventListener('keyup', (evt) => {
  if (evt.target.value < priceNameInputMinValue || evt.target.value > MAX_PRICE_LENGTH) {
    evt.target.setCustomValidity(`Цена должна быть от ${ priceNameInputMinValue } до ${ MAX_PRICE_LENGTH }`);
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

function handleRoomsChange() {
  const currentValue = Number(roomNumberSelect.value);
  if (currentValue === 100) {
    guestsNumberOptions.forEach((option) => {
      if (Number(option.value) < currentValue) {
        option.disabled = true;
        option.selected = false;
      } else {
        option.disabled = false;
        option.selected = true;
      }
    });
    return true;
  }

  guestsNumberOptions.forEach((option) => {
    if (Number(option.value) > currentValue) {
      option.disabled = true;
      option.selected = false;
    } else {
      option.disabled = false;
      option.selected = true;
    }
  });
}

window.addEventListener('load', handleRoomsChange);
roomNumberSelect.addEventListener('change', handleRoomsChange);
