function randomInteger(min, max) {
  if (min<0 || max<0 || max <= min) {
    return null;
  }
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomIntegerRounding(min, max, rounding) {
  if (min<0 || max<0 || max <= min) {
    return null; //console.log('Значения не могут быть отрицательными');
  }
  const randRounding = min + Math.random() * (max - min);
  //округляем указывая количество знаков после запятой в переменной "rounding"
  return randRounding.toFixed(rounding);
}

export {randomInteger, randomIntegerRounding};
