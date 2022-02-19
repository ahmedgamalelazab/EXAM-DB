module.exports.GenericError = class GenericErrorMessageBuilder {
  constructor() {
    this.message = '';
    this.object = '';
    this.function = '';
    this.success = false;
  }

  /**
   * @desc build error message content
   * @param {string} content
   * @returns {GenericErrorMessageBuilder}
   */
  message_content(content) {
    this.message = content;
    return this;
  }

  /**
   * @desc build error state content true or false
   * @param {boolean} state
   * @returns {GenericErrorMessageBuilder}
   */
  success_state(state) {
    this.this.success = state;
    return this;
  }

  /**
   * @desc pass the name of the object where the error had occur
   * @param {string} objectWhere
   * @returns {GenericErrorMessageBuilder}
   */
  object_error_occur(objectWhere) {
    this.object = objectWhere;
    return this;
  }
  /**
   * @desc pass the name of the function where the error had occur
   * @param {string} functionWhere
   * @returns {GenericErrorMessageBuilder}
   */
  function_error_occur(functionWhere) {
    this.message = functionWhere;
    return this;
  }

  /**
   * @desc use this to note that your object got build
   * @returns {GenericErrorMessageBuilder}
   */
  build() {
    return this;
  }
};
