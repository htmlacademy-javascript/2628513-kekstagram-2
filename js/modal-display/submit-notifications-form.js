import { sendData } from '../api.js';
import { uploadForm } from './scale-photo-form.js';
import { pristine, closeElement } from './upload-form.js';
import { body } from '../show-error-message.js';


const formSubmitButton = document.querySelector('.img-upload__submit');
const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;

};

const enabledButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;

};

const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const onNotificationClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton) {
    existElement.remove();
    body.removeEventListener('click', onNotificationClick);
  }

};
const onNotificationEsc = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (evt.key === 'Escape' || evt.key === 'Esc') {
    existElement.remove();
    body.removeEventListener('keydown', onNotificationEsc);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onNotificationClick);
  body.addEventListener('keydown', onNotificationEsc);
};

const sendFormData = async (formElement) => {
  const isValid = pristine.validate(); // 1. Проверяем валидацию (Pristine)
  if (isValid) {
    disabledButton(submitButtonText.SENDING); // 2. Блокируем кнопку

    try {
      await sendData(new FormData(formElement)); // 3. Отправляем данные на сервер (асинхронно)
      // Если всё ОК:
      appendNotification(templateSucces, () => closeElement()); // 4. Показываем "Успех" и закрываем редактор
    } catch (errors) {
      // Если ОШИБКА сервера:
      appendNotification(templateError); // 5. Показываем "Ошибка" (редактор НЕ закрывается)
    } finally {
      // В любом случае (успех или ошибка):
      enabledButton(submitButtonText.IDLE); // 6. Разблокируем кнопку обратно
    }
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

const initForm = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
};

export {initForm};
