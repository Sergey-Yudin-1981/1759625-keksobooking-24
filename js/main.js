function randomInteger(min, max) {
  if ( max <= min) {
    return console.log('Максимальное значение должно быть больше минимального');
  }
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

console.log('Случайное число: ' + randomInteger(1, 10));

function randomInteger(min, max) {
  if ( max <= min) {
    return console.log('Максимальное значение должно быть больше минимального');
  }
  let rand = min + Math.random() * (max + 1 - min);
  //округляем указывая количество знаков после запятой
  return rand.toFixed(3);
}

console.log('Случайное число: ' + randomInteger(10, 10));
