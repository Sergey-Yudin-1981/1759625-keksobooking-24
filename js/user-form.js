// const MIN_HEADING_LENGTH = 30;
// const MAX_HEADING_LENGTH = 100;
// const headingNameInput = document.querySelector('.ad-form__heading');
//
// headingNameInput.addEventListener('input', () => {
//   const valueLength = headingNameInput.value.length;
//
//   if (valueLength < MIN_HEADING_LENGTH) {
//     headingNameInput.setCustomValidity(`Ещё ${  MIN_HEADING_LENGTH - valueLength } симв.`);
//   } else if (valueLength > MAX_HEADING_LENGTH) {
//     headingNameInput.setCustomValidity(`Максимально ${  valueLength - MAX_HEADING_LENGTH } симв.`);
//   } else {
//     headingNameInput.setCustomValidity('');
//   }
//
//   headingNameInput.reportValidity();
// });
//
// const MIN_PRICE_LENGTH = 0;
// const MAX_PRICE_LENGTH = 1000000;
// const priceNameInput = document.querySelector('.ad-form__price');
//
// //console.log(priceNameInput.Validity);
// priceNameInput.addEventListener('input', () => {
//   const valueLength = priceNameInput.value;
//   console.log(valueLength);
//   if (valueLength < MIN_PRICE_LENGTH) {
//     priceNameInput.setCustomValidity(`Ещё ${  MIN_PRICE_LENGTH - valueLength } симв.`);
//   } else if (valueLength > MAX_PRICE_LENGTH) {
//     priceNameInput.setCustomValidity(`Максимально ${ MAX_PRICE_LENGTH } симв.`);
//   } else {
//     priceNameInput.setCustomValidity('');
//   }
//
//   priceNameInput.reportValidity();
// });
