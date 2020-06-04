import errors from '../constants/errors';

const {ERROR_COUNT_WORDS, ERROR_PASSWORD_COUNT, ERROR_EMAIL, ERROR_REQUIRED, ERROR_NAME, USER_NOT_FOUND, SERVER_ERROR, NOT_UNIQUE, INVALID_EMAIL} = errors;

export default class Form {
  constructor(form, button) {
    this.form = form;
    this.submitButton = button;
    this.handleValidate = this.handleValidate.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }

  validate(element) {
    const error = element.nextElementSibling;
    if (element.validity.valueMissing) {
      error.textContent = ERROR_REQUIRED;
    } else if (element.validity.tooShort && element.name === 'password') {
      error.textContent = ERROR_PASSWORD_COUNT;
    } else if (element.validity.tooShort) {
      error.textContent = ERROR_COUNT_WORDS;
    } else if (element.validity.patternMismatch && element.name === 'email') {
      error.textContent = ERROR_EMAIL;
    } else if (element.validity.patternMismatch) {
      error.textContent = ERROR_NAME;
    } else {
      this.resetError(element);
    }
    this.checkSubmit();
  }

  handleValidate(e) {
    this.resetError(e.target);
    this.resetSubmitError();
    this.validate(e.target);
  }

  resetSubmitError() {
    this.submitButton.previousElementSibling.textContent = '';
  }

  resetError(element) {
    element.nextElementSibling.textContent = '';
  }

  checkSubmit() {
    if (this.form.checkValidity()) {
      this.enableSubmit();
    } else {
      this.disableSubmit();
    }
  }

  disableSubmit() {
    this.submitButton.classList.add('button_disabled');
    this.submitButton.setAttribute('disabled', 'true');
  }

  enableSubmit() {
    this.submitButton.classList.remove('button_disabled');
    this.submitButton.removeAttribute('disabled');
  }

  errorHandler(err) {
    switch (err) {
      case 400:
        return INVALID_EMAIL;
      case 401:
        return USER_NOT_FOUND;
      case 500:
        return SERVER_ERROR;
      case 409:
        return NOT_UNIQUE;
      default:
        return '';
    }
  }
}
