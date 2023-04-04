import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailFieldEl = document.querySelector('[name="email"]');
const messageFieldEl = document.querySelector('[name="message"]');

const STORAGE = 'feedback-form-state';
let storageData = '';
let formData = {};

restoreFormData();
formEl.addEventListener('input', throttle(saveFormData, 500));
formEl.addEventListener('submit', submitForm);

function saveFormData(e) {
  formData[e.target.name] = e.target.value;
  storageData = JSON.stringify(formData);
  localStorage.setItem(STORAGE, storageData);
}

function restoreFormData() {
  storageData = localStorage.getItem(STORAGE);
  if (!storageData) {
    return;
  }
  formData = JSON.parse(storageData);
  for (const element of formEl.elements) {
    if (formData[element.name]) {
      element.value = formData[element.name];
    }
  }
}

function submitForm(e) {
  e.preventDefault();
  if (!emailFieldEl.value || !messageFieldEl.value) {
    alert('Необхідно заповнити всі поля форми');
    return;
  }
  console.log(formData);
  formEl.reset();
  formData = {};
  localStorage.removeItem(STORAGE);
}
