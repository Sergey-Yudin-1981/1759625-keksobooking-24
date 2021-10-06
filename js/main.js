function randomInteger(min, max) {
  if (min<0 || max<0 || max <= min) {
    return null;
  }

  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
//console.log('Случайное число: ' +
randomInteger(1, 10);

function randomIntegerRounding(min, max, rounding) {
  if (min<0 || max<0 || max <= min) {
    return null; //console.log('Значения не могут быть отрицательными');
  }
  const randRounding = min + Math.random() * (max - min);
  //округляем указывая количество знаков после запятой в переменной "rounding"
  return randRounding.toFixed(rounding);
}
//console.log('Случайное число: '+
randomIntegerRounding(1,10,3);

function pickRandomFromArr(arr, count) {
  const resultArray = [];
  for (let counter = 0; counter < count; counter += 1) {
    const newElement = arr[randomInteger(0, arr.length - 1)];
    if (resultArray.includes(newElement)) {
      continue;
    } else {
      resultArray.push(newElement);
    }
  }
  return resultArray;
}

const templateObj = {
  author: {
    avatar: 'img/avatars/user{{xx}}.png',
  },
  offer: {
    title: 'Heading',
    address: '56.750216, 60.153892',
    price: 156516,
    type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
    rooms: 5,
    guests: 2,
    checkin:['12:00','13:00','14:00'],
    checkout: ['12:00','13:00','14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: 'Описание',
    photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'],
  },
  location: {
    lat: '56.750216',
    lng: '55.65165165',
  },
};

function createHotelObj(index) {
  const indexStr = String(index);

  let tempIndex = indexStr;
  if (indexStr.length === 1) {
    tempIndex = '0' + indexStr;
  }

  return {
    author: {
      avatar: 'img/avatars/user' + tempIndex + '.png',
    },
    offer: {
      title: 'Название ' + tempIndex,
      address: '56.750216, 60.153892',
      price: randomInteger(1, 5),
      type: templateObj.offer.type[randomInteger(0, 4)],
      rooms: randomInteger(1, 10),
      guests: randomInteger(1, 8),
      checkin: templateObj.offer.checkin[randomInteger(0, 2)],
      checkout: templateObj.offer.checkout[randomInteger(0, 2)],
      features: pickRandomFromArr(templateObj.offer.features, randomInteger(1, templateObj.offer.features.length)),
      description: 'Находится в центер города. Удобно добираться любым транспортом до любого района города',
      photos: pickRandomFromArr(templateObj.offer.photos, randomInteger(1, templateObj.offer.photos.length)),
    },
    location: {
      lat: randomIntegerRounding(35.65000, 35.70000, 5),
      lng: randomIntegerRounding(139.70000, 139.80000, 5),
    },
  }


const hotels = [];

for (let id = 1; id < 11; id++) {
  hotels.push(createHotelObj(id));
}
