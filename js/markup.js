import {getNoun} from './declensions.js';

const typeBuilding = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const loadElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

const fillAvatar = (product, template) => {
  const avatarSrc = product.author.avatar;
  const avatarNode = template.querySelector('.popup__avatar');
  if (avatarSrc) {
    avatarNode.setAttribute('src', avatarSrc);
  } else {
    avatarNode.remove();
  }
};

const fillTitle = (product, template) => {
  const title = product.offer.title;
  const titleNode = template.querySelector('.popup__title');
  if (title) {
    titleNode.innerText = title;
  } else {
    titleNode.remove();
  }
};

const fillAdress = (product, template) => {
  const address = product.offer.address;
  const addressNode = template.querySelector('.popup__text--address');
  if (address) {
    addressNode.innerText = address;
  } else {
    addressNode.remove();
  }
};

const fillPrice = (product, template) => {
  const price = product.offer.price;
  const priceNode = template.querySelector('.popup__text--price');
  if (price) {
    priceNode.textContent = `${price} ₽/ночь`;
  } else {
    priceNode.remove();
  }
};

const fillType = (product, template) => {
  const type = product.offer.type;
  const typeNode = template.querySelector('.popup__type');
  if (type) {
    typeNode.innerText = typeBuilding[product.offer.type];
  } else {
    typeNode.remove();
  }
};

const fillRoomsGuests = (product, template) => {
  const rooms = product.offer.rooms;
  const guests = product.offer.guests;
  const roomsGuestsNode = template.querySelector('.popup__text--capacity');
  if (rooms && guests) {
    const roomsString = getNoun(product.offer.rooms, 'комната', 'комнаты', 'комнат');
    const guestsString = getNoun(product.offer.guests, 'гостя', 'гостей', 'гостей');
    roomsGuestsNode.innerText = `${product.offer.rooms} ${roomsString} для ${product.offer.guests} ${guestsString}`;
  } else {
    roomsGuestsNode.remove();
  }
};

const fillTimeInOut = (product, template) => {
  const timeIn = product.offer.checkin;
  const timeOut = product.offer.checkout;
  const timeInOutNode = template.querySelector('.popup__text--time');
  if (timeIn && timeOut) {
    timeInOutNode.innerText = `Заезд после ${product.offer.checkin}, выезд до ${product.offer.checkout}`;
  } else {
    timeInOutNode.remove();
  }
};

const fillFeatures = (product, template) => {
  const featuresNode = template.querySelector('.popup__features');
  if (product.offer.features && product.offer.features.length > 0) {
    const featuresFragment = document.createDocumentFragment();
    product.offer.features.forEach((features) => {
      const featuresListItem = template.querySelector(`.popup__feature--${features}`);
      if (featuresListItem) {
        featuresFragment.append(featuresListItem);
      }
    });
    featuresNode.innerHTML = '';
    featuresNode.append(featuresFragment);
  } else {
    featuresNode.remove();
  }
};

const fillDescription = (product, template) => {
  const descriptionNode = template.querySelector('.popup__description');
  if (product.offer.description) {
    descriptionNode.innerText = product.offer.description;
  } else {
    descriptionNode.remove();
  }
};


const fillPhoto = (product, template) => {
  const photoNode = template.querySelector('.popup__photos');
  photoNode.innerHTML = '';
  if (product.offer.photos && product.offer.photos.length > 0) {
    product.offer.photos.forEach((photo) => {
      const img = loadElement('img', 'popup__photo');
      img.setAttribute('src', photo);
      img.setAttribute('width', '45px');
      img.setAttribute('height', '40px');
      img.setAttribute('alt', 'Фотография жилья');
      photoNode.appendChild(img);
    });
  } else {
    photoNode.remove();
  }
};

const fillHotelElement = (product, templateId) => {
  if (!product || !templateId) {
    return false;
  }
  const template = document.querySelector(templateId);
  if (!template) {
    return false;
  }
  //клонируем содержимое template (вложения)
  const clonedContent = template.content.querySelector('.popup').cloneNode(true);
  fillAvatar(product, clonedContent);

  // Заголовок
  fillTitle(product, clonedContent);

  //адрес
  fillAdress(product, clonedContent);

  //Стоимость проживания
  fillPrice(product, clonedContent);

  //Тип жилья
  fillType(product, clonedContent);

  //комнаты и гости
  fillRoomsGuests(product, clonedContent);

  //Время заезда и выезда
  fillTimeInOut(product, clonedContent);

  //удобства
  fillFeatures(product, clonedContent);

  //описание
  fillDescription(product, clonedContent);

  //фотографии
  fillPhoto(product, clonedContent);

  return clonedContent;
};


export {fillHotelElement};
