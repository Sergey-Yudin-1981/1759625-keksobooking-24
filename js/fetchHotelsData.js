const fetchedData = fetch('https://24.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
);

export {fetchedData};
