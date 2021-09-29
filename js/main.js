function randomInteger(min, max) {
  if (min<0 || max<0) {
    return;
  }
  if ( max <= min) {
    return; // console.log('Максимальное значение должно быть больше минимального');
  }
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
//console.log('Случайное число: ' +
randomInteger(1, 10);

function randomIntegerRounding(min, max, rounding) {
  if (min<0 || max<0) {
    return; //console.log('Значения не могут быть отрицательными');
  }
  if ( max <= min) {
    return; //console.log('Максимальное значение должно быть больше минимального');
  }
  const randRounding = min + Math.random() * (max + 1 - min);
  //округляем указывая количество знаков после запятой в переменной "rounding"
  return randRounding.toFixed(rounding);
}
//console.log('Случайное число: '+
randomIntegerRounding(10,10,3);
