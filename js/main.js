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

const type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00','13:00','14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const minNumber = 1;
const maxNumber = 10;
const minPrice = 1000;
const maxPrice = 10000;

function createHotelObj(index) {
  let tempIndex = index;
  if (index < 10) {
    tempIndex = `0${index}`;
  }

  const lat = randomIntegerRounding(35.65000, 35.70000, 5);
  const lng = randomIntegerRounding(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: `img/avatars/user${tempIndex}.png`,
    },
    offer: {
      title: `Название ${tempIndex}`,
      address: `${lat}, ${lng}`,
      price: randomInteger(minPrice, maxPrice),
      type: type[randomInteger(0, type.length)],
      rooms: randomInteger(minNumber, maxNumber),
      guests: randomInteger(minNumber, maxNumber),
      checkin: checkin[randomInteger(0, checkin.length)],
      checkout: checkin[randomInteger(0, checkin.length)],
      features: pickRandomFromArr(features, randomInteger(1, features.length)),
      description: 'Находится в центер города. Удобно добираться любым транспортом до любого района города',
      photos: pickRandomFromArr(photos, randomInteger(1, photos.length)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
}

const hotels = [];

function createHotelNumber(hotelNumber) {
  for (let id = 1; id < (hotelNumber+1); id++) {
    hotels.push(createHotelObj(id));
  }
  return (hotels);
}

createHotelNumber(12);
