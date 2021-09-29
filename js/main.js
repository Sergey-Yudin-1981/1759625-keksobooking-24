function randomInteger(min, max) {
  if ( max <= min) {
    return console.log('Максимальное значение должно быть больше минимального');
  }
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log('Случайное число: ' + randomInteger(1, 10));

function randomIntegerRounding(min, max, rounding) {
  if ( max <= min) {
    return console.log('Максимальное значение должно быть больше минимального');
  }
  let rand = min + Math.random() * (max + 1 - min);
  //округляем указывая количество знаков после запятой
  return rand.toFixed(rounding);
}

console.log('Случайное число: ' + randomIntegerRounding(10, 10, 3));
