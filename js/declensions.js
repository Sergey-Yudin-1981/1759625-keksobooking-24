function getRooms(rooms) {
  let n = Math.abs(rooms);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return 'комнат';
  }
  n %= 10;
  if (n === 1) {
    return 'комната';
  }
  if (n >= 2 && n <= 4) {
    return 'комнаты';
  }
  return 'комнат';
}

function getGuest(guest) {
  let m = Math.abs(guest);
  m %= 100;
  if (m >= 2) {
    return 'гостей';
  }
  m %= 10;
  if (m === 1) {
    return 'гостя';
  }
  return 'гостей';
}

export {getRooms, getGuest};
