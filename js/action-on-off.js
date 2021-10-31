function activeOff (classForm, classMap) {
  const data = [classForm, classMap];
  for (let j = 0; j < data.length; j ++) {
    const objectForm = document.querySelector(data[j]);
    objectForm.classList.add('ad-form--disabled');
    const elementForm = objectForm.childNodes; //находим все дочерние элементы
    for( let i = 0; i < elementForm.length; i++ ){
      elementForm[i].disabled = true; //добавление атрибута disabled элементу
    }
  }
  // if (classOff = 'off') {
  //   const objectForm = document.querySelector('.ad-form');
  //   objectForm.classList.add('ad-form--disabled');
  //   const elementForm = objectForm.childNodes;
  //   for( let i = 0; i < elementForm.length; i++ ){
  //     elementForm[i].disabled = true; //добавление атрибута disabled элементу
  //   }
  //
  //   const objectMap = document.querySelector('.map__filters');
  //   objectMap.classList.add('ad-form--disabled');
  //   const elementMap = objectMap.childNodes;
  //   for( let j = 0; j < elementMap.length; j++ ){
  //     elementMap[j].disabled = true; //добавление атрибута disabled элементу
  //   }
  //   console.log(elementMap);
  // }
}
export {activeOff};
