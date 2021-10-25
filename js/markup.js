const typeBuilding = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const dictionary = {
  rooms: {
    1: 'комната',
    2: 'комнаты',
    3: 'комнаты',
    4: 'комнаты',
    5: 'комнат',
  },
  guests: {
    1: 'гостя',
    2: 'гостей',
  },
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

function createElement (product) {
  const listItem = maleElement('article', 'popup');

  const avatar = maleElement('img', 'popup__avatar');
  avatar.src = product.author.avatar ? product.author.avatar : '/img/default-avatar.jpg';
  listItem.appendChild(avatar);

  const productTitle = product.offer.title ? product.offer.title : 'Без названия';
  const title = maleElement('h3', 'popup__title', productTitle);
  listItem.appendChild(title);

  const productAddress = product.offer.address ? product.offer.address : 'Без адреса';
  const add = maleElement('p', 'popup__text--address', productAddress);
  listItem.appendChild(add);

  const productPrice = product.offer.price ? `${product.offer.price} ₽/ночь` : 'Цена не указана';
  const price = maleElement('p', 'popup__text--price', productPrice);
  listItem.appendChild(price);

  const productType = product.offer.type ?  typeBuilding[product.offer.type] : 'Нет данных';
  const type = maleElement('h4', 'popup__type', productType);
  listItem.appendChild(type);

  let roomGuestsString = '';
  if (product.offer.rooms && product.offer.guests) {
    const roomsString = dictionary.rooms[product.offer.rooms] ? dictionary.rooms[product.offer.rooms] : dictionary.rooms['5'];
    const guestsString = dictionary.guests[product.offer.guests] ? dictionary.guests[product.offer.guests] : dictionary.guests['2'];
    roomGuestsString = `${product.offer.rooms} ${roomsString} для ${product.offer.guests} ${guestsString}`;
  } else {
    roomGuestsString = 'уточните данные по телефону';
  }

  const roomsGuest = maleElement('p', 'popup__text--capacity', roomGuestsString);
  listItem.appendChild(roomsGuest);

  const features = maleElement('ul', 'popup__features');
  listItem.appendChild(features);
  if (product.offer.features && product.offer.features.length > 0) {
    for (let j = 0; j < product.offer.features.length; j ++) {
      const feature = maleElement('li', 'popup__feature');
      feature.classList.add(`popup__feature--${product.offer.features[j]}`);
      features.appendChild(feature);
    }
  } else {
    const feature = maleElement('li', '', 'нет плюшек');
    features.appendChild(feature);
  }

  const productDescription = product.offer.description ? product.offer.description : 'Нет описания';
  const descript = maleElement('p', 'popup__description', productDescription);
  listItem.appendChild(descript);


  const images = maleElement('div', 'popup__photos');
  listItem.appendChild(images);
  //
  if (product.offer.photos && product.offer.photos.length > 0) {
    for (let q = 0; q < product.offer.photos.length; q ++) {
      const img = maleElement('img', 'popup__photo');
      img.src = product.offer.photos[q];
      images.appendChild(img);
    }
  } else {
    const img = maleElement('img', '', 'Нет фотографий');
    images.appendChild(img);
  }
  return(listItem);
}

export {createElement};
