// function openPopupMessage(type, text) {
//   const popupNode = document.getElementById('messagePopup');
//
//   if (!popupNode || !type) {
//     return false;
//   }
//   let template;
//   if (type === 'success') {
//     template = document.getElementById('success').content.cloneNode('true');
//   } else if (type === 'error') {
//     template = document.getElementById('error').content.cloneNode('true');
//   }
//
//   popupNode.querySelector('.popup-message__content').append(template);
//   popupNode.classList.remove('hidden');
// }
//
// function closePopupMessage() {
//   document.getElementById('messagePopup').classList.add('hidden');
// }
//
// document.querySelector('.popup-message__close').addEventListener('click', closePopupMessage);
//
// export {openPopupMessage};

// function openServerError(text) {
//   const popupContent = document.getElementById('serverError').content.cloneNode(true);
//   popupContent.querySelector('.error').setAttribute('id', 'serverErrorShow');
//   if (text) {
//     popupContent.querySelector('.error__message').innerText = text;
//   }
//   popupContent.querySelector('.error__button').addEventListener('click', closeServerError);
//   document.body.append(popupContent);
// }
//
// function closeServerError() {
//   document.getElementById('serverErrorShow').remove();
// }


function activatePopup(nodeId) {
  if (!nodeId) {
    return false;
  }
  const content = document.getElementById(nodeId).content.cloneNode(true);
  content.firstChild.nextElementSibling.setAttribute('id', 'activePopup');
  document.body.append(content);

  function closePopup() {
    document.getElementById('activePopup').remove();
    document.removeEventListener('click', closePopup);
  }

  function handleEscBtn(evt) {
    if (evt.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', handleEscBtn);
    }
  }

  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', handleEscBtn);

}

export {activatePopup};
