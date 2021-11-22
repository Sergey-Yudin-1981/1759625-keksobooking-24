const disableForm = (classFormMap, block) => {
  for (let j = 0; j < classFormMap.length; j ++) {
    const objectForm = document.querySelector(classFormMap[j]);
    if (block) {
      objectForm.classList.add('ad-form--disabled');
    } else {
      objectForm.classList.remove('ad-form--disabled');
    }
    const elementForm = objectForm.childNodes; //находим все дочерние элементы
    for( let i = 0; i < elementForm.length; i++ ){
      elementForm[i].disabled = block; //добавление атрибута disabled элементу
    }
  }
};
export {disableForm};
