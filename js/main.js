const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00','13:00','14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MINNUMBER = 1;
const MAXNUMBER = 10;
const MINPRICE = 1000;
const MAXPRICE = 10000;
const MINLAT = 35.65000;
const MAXLAT = 35.70000;
const MINLNG = 139.70000;
const MAXLNG = 139.80000;
const ROUND = 5;

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
  for (let counter = 0; counter < count; counter ++) {
    const newElement = arr[randomInteger(0, arr.length - 1)];
    if (resultArray.includes(newElement)) {
      continue;
    } else {
      resultArray.push(newElement);
    }
  }
  return resultArray;
}

function createHotelObj(index) {
  let tempIndex = index;
  if (index < 10) {
    tempIndex = `0${index}`;
  }

  const lat = randomIntegerRounding(MINLAT, MAXLAT, ROUND);
  const lng = randomIntegerRounding(MINLNG, MAXLNG, ROUND);

  return {
    author: {
      avatar: `img/avatars/user${tempIndex}.png`,
    },
    offer: {
      title: `Название ${tempIndex}`,
      address: `${lat}, ${lng}`,
      price: randomInteger(MINPRICE, MAXPRICE),
      type: TYPE[randomInteger(0, TYPE.length)],
      rooms: randomInteger(MINNUMBER, MAXNUMBER),
      guests: randomInteger(MINNUMBER, MAXNUMBER),
      checkin: CHECKIN[randomInteger(0, CHECKIN.length)],
      checkout: CHECKIN[randomInteger(0, CHECKIN.length)],
      features: pickRandomFromArr(FEATURES, randomInteger(1, FEATURES.length)),
      description: 'Находится в центер города. Удобно добираться любым транспортом до любого района города',
      photos: pickRandomFromArr(PHOTOS, randomInteger(1, PHOTOS.length)),
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
}

function createHotelNumber(hotelNumber) {
  const hotels = [];
  for (let id = 1; id <= hotelNumber; id++) {
    hotels.push(createHotelObj(id));
  }
  return (hotels);
}

createHotelNumber(10);
