import {getRooms, getGuest} from './declensions.js';

const typeBuilding = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function maleElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function fillHotelElement(product, templateId) {
  if (!product || !templateId) {
    return false;
  }
  const template = document.querySelector(templateId);
  if (!template) {
    return false;
  }
  const clonedContent = template.content.querySelector('.popup').cloneNode(true); //клонируем содержимое template (вложения)

  // Аватар
  const avatarSrc = product.author.avatar;
  const avatarNode = clonedContent.querySelector('.popup__avatar');
  if (avatarSrc) {
    avatarNode.src = avatarSrc;
  } else {
    avatarNode.remove();
  }

  // Заголовок
  const title = product.offer.title;
  const titleNode = clonedContent.querySelector('.popup__title');
  if (title) {
    titleNode.innerText = title;
  } else {
    titleNode.remove();
  }

  //адрес
  const address = product.offer.address;
  const addressNode = clonedContent.querySelector('.popup__text--address');
  if (address) {
    addressNode.innerText = address;
  } else {
    addressNode.remove();
  }

  //Стоимость проживания
  const price = product.offer.price;
  const priceNode = clonedContent.querySelector('.popup__text--price');
  if (price) {
    priceNode.innerHTML = `${price} <span>₽/ночь</span>`;
  } else {
    priceNode.remove();
  }

  //Тип жилья
  const type = product.offer.type;
  const typeNode = clonedContent.querySelector('.popup__type');
  if (type) {
    typeNode.innerText = typeBuilding[product.offer.type];
  } else {
    typeNode.remove();
  }

  //комнаты и гости
  const rooms = product.offer.rooms;
  const guests = product.offer.guests;
  const roomsGuestsNode = clonedContent.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    const roomsString = getRooms(product.offer.rooms);
    const guestsString = getGuest(product.offer.guests);
    roomsGuestsNode.innerText = `${product.offer.rooms} ${roomsString} для ${product.offer.guests} ${guestsString}`;
  } else {
    roomsGuestsNode.remove();
  }

  //Время заезда и выезда
  const timeIn = product.offer.checkin;
  const timeOut = product.offer.checkout;
  const timeInOutNode = clonedContent.querySelector('.popup__text--time');
  if (timeIn && timeOut) {
    timeInOutNode.innerText = `Заезд после ${product.offer.checkin}, выезд до ${product.offer.checkout}`;
  } else {
    timeInOutNode.remove();
  }

  //удобства
  const featuresNode = clonedContent.querySelector('.popup__features');
  if (product.offer.features && product.offer.features.length > 0) {
    const featuresFragment = document.createDocumentFragment();
    product.offer.features.forEach((features) => {
      const featuresListItem = clonedContent.querySelector(`.popup__feature--${features}`);
      if (featuresListItem) {
        featuresFragment.append(featuresListItem);
      }
    });
    featuresNode.innerHTML = '';
    featuresNode.append(featuresFragment);
  } else {
    featuresNode.remove();
  }

  //описание
  const descriptionNode = clonedContent.querySelector('.popup__description');
  if (product.offer.description) {
    descriptionNode.innerText = product.offer.description;
  } else {
    descriptionNode.remove();
  }

  //фотографии
  const photoNode = clonedContent.querySelector('.popup__photos');
  photoNode.innerHTML = '';
  if (product.offer.photos && product.offer.photos.length > 0) {
    product.offer.photos.forEach((photo) => {
      const img = maleElement('img', 'popup__photo');
      img.src = photo;
      img.setAttribute('width', '45px');
      img.setAttribute('height', '40px');
      img.alt = 'Фотография жилья';
      photoNode.appendChild(img);
    });
  } else {
    photoNode.remove();
  }

  return clonedContent;
}


export {fillHotelElement};
