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

function saveFormData() {
  formData.email = emailFieldEl.value;
  formData.message = messageFieldEl.value;
  storageData = JSON.stringify(formData);
  localStorage.setItem(STORAGE, storageData);
}

function restoreFormData() {
  storageData = localStorage.getItem(STORAGE);
  if (storageData) {
    formData = JSON.parse(storageData);
    emailFieldEl.value = formData.email;
    messageFieldEl.value = formData.message;
  }
}

function submitForm(e) {
  e.preventDefault();
  if (!emailFieldEl.value) {
    alert('Вкажіть електронну адресу для підписки');
    return;
  }
  console.log(formData);
  formEl.reset();
  localStorage.removeItem(STORAGE);
}
