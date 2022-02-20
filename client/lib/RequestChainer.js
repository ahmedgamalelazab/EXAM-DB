class Request {
  constructor(payload, url) {
    this.formPayload = payload;
    this.url = url;
  }
  /**
   * @desc get the request payload
   * @returns {object}
   */
  getRequestPayload() {
    return this.formPayload;
  }

  getRequestUrl() {
    return this.url;
  }
}

class RequestHandler {
  /**
   * @desc constructor takes window.location to navigate the user after handle the request
   * @param {window.location} locationObject
   * @param Message_HTMLComponent
   * @param Error_HTMLComponent
   */
  constructor(locationObject, loadingUIComponent, errMessageComponent) {
    this.locationObject = locationObject;
    this.loadingComponent = loadingUIComponent;
    this.errorMessageComponent = errMessageComponent;
  }

  next(handler) {
    this.requestHandler = handler;
  }

  /**
   *
   * @param {Request} request
   */
  async handleRequest(request) {} //every handler will implement on their own
}

export { Request, RequestHandler };
