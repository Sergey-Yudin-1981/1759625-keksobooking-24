const Type = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const Checkin = ['12:00','13:00','14:00'];
const Features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const Photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MinNumber = 1;
const MaxNumber = 10;
const MinPrice = 1000;
const MaxPrice = 10000;
const MinLat = 35.65000;
const MaxLat = 35.70000;
const MinLng = 139.70000;
const MaxLng = 139.80000;
const Round = 5;

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

  const Lat = randomIntegerRounding(MinLat, MaxLat, Round);
  const Lng = randomIntegerRounding(MinLng, MaxLng, Round);

  return {
    author: {
      avatar: `img/avatars/user${tempIndex}.png`,
    },
    offer: {
      title: `Название ${tempIndex}`,
      address: `${Lat}, ${Lng}`,
      price: randomInteger(MinPrice, MaxPrice),
      type: Type[randomInteger(0, Type.length)],
      rooms: randomInteger(MinNumber, MaxNumber),
      guests: randomInteger(MinNumber, MaxNumber),
      checkin: Checkin[randomInteger(0, Checkin.length)],
      checkout: Checkin[randomInteger(0, Checkin.length)],
      features: pickRandomFromArr(Features, randomInteger(1, Features.length)),
      description: 'Находится в центер города. Удобно добираться любым транспортом до любого района города',
      photos: pickRandomFromArr(Photos, randomInteger(1, Photos.length)),
    },
    location: {
      lat: Lat,
      lng: Lng,
    },
  };
}

function createHotelNumber(hotelNumber) {
  const Hotels = [];
  for (let id = 1; id <= hotelNumber; id++) {
    Hotels.push(createHotelObj(id));
  }
  return (Hotels);
}

createHotelNumber(10);
