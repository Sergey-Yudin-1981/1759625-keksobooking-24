const keyEsc = 'Escape';
const activatePopup = (nodeId) => {
  if (!nodeId) {
    return false;
  }
  const content = document.getElementById(nodeId).content.cloneNode(true);
  content.firstChild.nextElementSibling.setAttribute('id', 'activePopup');
  document.body.append(content);

  function closePopup() {
    document.getElementById('activePopup').remove();
    document.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', handleEscBtn);
  }
  function handleEscBtn(evt) {
    if (evt.key === keyEsc) {
      closePopup();
      document.removeEventListener('keydown', handleEscBtn);
      document.removeEventListener('click', closePopup);
    }
  }

  document.addEventListener('click', closePopup);
  document.addEventListener('keydown', handleEscBtn);

};

export {activatePopup};
