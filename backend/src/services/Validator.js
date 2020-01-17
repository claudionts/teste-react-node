export default class Validator {
  constructor() {
    this.error = {};
  }

  updateError(message) {
    this.error = { message };
  }

  isRequired(value, message) {
    if (!value || value.length <= 0)
      this.updateError(message);
  }

  hasMinLen(value, min, message) {
    if (!value || value.length < min)
      this.updateError(message);
  }

  hasMaxLen(value, max, message) {
    if (!value || value.length > max)
      this.updateError(message);
  }

  isEmail(value, message) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
      this.updateError(message);
  }

  getError() {
    return this.error;
  }

  clear() {
    this.error = {};
  }

  isValid() {
    return Object.keys(this.error).length == 0;
  }
};