function disableForm (classFormMap, block) {
  if (block) {
    for (let j = 0; j < classFormMap.length; j ++) {
      const objectForm = document.querySelector(classFormMap[j]);
      objectForm.classList.add('ad-form--disabled');
      const elementForm = objectForm.childNodes; //находим все дочерние элементы
      for( let i = 0; i < elementForm.length; i++ ){
        elementForm[i].disabled = true; //добавление атрибута disabled элементу
      }
    }
  }
}
export {disableForm};
