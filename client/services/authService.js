import { Request, RequestHandler } from '../lib/RequestChainer.js';
import { delay } from '../lib/NetworkResDelayer.js';
class AdminRequestHandler extends RequestHandler {
  constructor(locationObj, loadingUIComponent, errorMessageUIComponent) {
    super(locationObj, loadingUIComponent, errorMessageUIComponent);
  }

  async handleRequest(request) {
    const reqPayload = request.getRequestPayload();
    const reqUrl = request.getRequestUrl();

    return new Promise(async (resolve, reject) => {
      if (reqPayload && reqUrl) {
        const { email, password } = reqPayload;
        if (email && password) {
          try {
            //if request came well && request carries email and password
            //network request then update ui
            this.loadingComponent.style.display = 'block'; //loading on
            this.errorMessageComponent.style.display = 'none';
            const serverResponse = await fetch(reqUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqPayload),
            });
            const formattedResponse = await serverResponse.json();
            console.log(formattedResponse);
            const { success } = formattedResponse;
            if (success) {
              //TODO store the token in localstorage
              const { token, user } = formattedResponse;
              if (user !== 'admin') {
                // go chain
                this.requestHandler.handleRequest(request);
              } else {
                await delay(3000);
                console.log('success logged as admin');
                this.loadingComponent.style.display = 'none'; //loading on
                this.errorMessageComponent.style.display = 'none';
                this.locationObject.replace(
                  'http://127.0.0.1:5500/client/admin/admin.html'
                );
                resolve('success logged as admin');
              }
            } else {
              //chaining start
              const { message } = formattedResponse;
              //TODO display message to the user on the errorUIComponent server message
              this.loadingComponent.style.display = 'none'; //loading on
              this.errorMessageComponent.innerText = message;
              this.errorMessageComponent.style.display = 'block';
              reject(new Error(message));
            }
          } catch (err) {
            this.loadingComponent.style.display = 'none'; //loading on
            reject(err);
          }
        } else {
          reject(new Error(`error with auth payload or request url`));
        }
      } else {
        reject(new Error(`error with auth payload`));
      }
    });
  }
}

class InstructorRequestHandler extends RequestHandler {
  constructor(locationObj, loadingUIComponent, errorMessageUIComponent) {
    super(locationObj, loadingUIComponent, errorMessageUIComponent);
  }

  async handleRequest(request) {
    const reqPayload = request.getRequestPayload();
    const reqUrl = request.getRequestUrl();

    return new Promise(async (resolve, reject) => {
      if (reqPayload && reqUrl) {
        const { email, password } = reqPayload;
        if (email && password) {
          try {
            //if request came well && request carries email and password
            //network request then update ui
            this.loadingComponent.style.display = 'block'; //loading on
            this.errorMessageComponent.style.display = 'none';
            const serverResponse = await fetch(reqUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqPayload),
            });
            const formattedResponse = await serverResponse.json();
            console.log(formattedResponse);
            const { success } = formattedResponse;
            if (success) {
              //TODO store the token in localstorage
              const { token, user } = formattedResponse;
              if (user !== 'instructor') {
                // go chain
                this.requestHandler.handleRequest(request);
              } else {
                await delay(3000);
                console.log('success logged as instructor');
                this.loadingComponent.style.display = 'none'; //loading on
                this.errorMessageComponent.style.display = 'none';
                this.locationObject.replace(
                  'http://127.0.0.1:5500/client/instructor/instructor.html'
                );
                resolve('success logged as instructor');
              }
            } else {
              //chaining start
              const { message } = formattedResponse;
              //TODO display message to the user on the errorUIComponent server message
              this.loadingComponent.style.display = 'none'; //loading on
              this.errorMessageComponent.innerText = message;
              this.errorMessageComponent.style.display = 'block';
              reject(new Error(message));
            }
          } catch (err) {
            this.loadingComponent.style.display = 'none'; //loading on
            reject(err);
          }
        } else {
          reject(new Error(`error with auth payload or request url`));
        }
      } else {
        reject(new Error(`error with auth payload`));
      }
    });
  }
}

class StudentRequestHandler extends RequestHandler {
  constructor(locationObj, loadingUIComponent, errorMessageUIComponent) {
    super(locationObj, loadingUIComponent, errorMessageUIComponent);
  }

  async handleRequest(request) {
    const reqPayload = request.getRequestPayload();
    const reqUrl = request.getRequestUrl();

    return new Promise(async (resolve, reject) => {
      if (reqPayload && reqUrl) {
        const { email, password } = reqPayload;
        if (email && password) {
          try {
            //if request came well && request carries email and password
            //network request then update ui
            this.loadingComponent.style.display = 'block'; //loading on
            this.errorMessageComponent.style.display = 'none';
            const serverResponse = await fetch(reqUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(reqPayload),
            });
            const formattedResponse = await serverResponse.json();
            console.log(formattedResponse);
            const { success } = formattedResponse;
            if (success) {
              //TODO store the token in localstorage
              const { token, user } = formattedResponse;
              if (user !== 'student') {
                // go chain
                //do nothing
              } else {
                await delay(3000);
                console.log('success logged as student');
                this.loadingComponent.style.display = 'none'; //loading on
                this.errorMessageComponent.style.display = 'none';
                this.locationObject.replace(
                  'http://127.0.0.1:5500/client/student/admin.html'
                );
                resolve('success logged as student');
              }
            } else {
              //chaining start
              const { message } = formattedResponse;
              //TODO display message to the user on the errorUIComponent server message
              this.loadingComponent.style.display = 'none'; //loading on
              this.errorMessageComponent.innerText = message;
              this.errorMessageComponent.style.display = 'block';
              reject(new Error(message));
            }
          } catch (err) {
            this.loadingComponent.style.display = 'none'; //loading on
            reject(err);
          }
        } else {
          reject(new Error(`error with auth payload or request url`));
        }
      } else {
        reject(new Error(`error with auth payload`));
      }
    });
  }
}

class UserAuthService {
  constructor(
    payload,
    url,
    locationObj,
    loadingUIComponent,
    errMessageUIComponent
  ) {
    this.requestPayload = payload;
    this.locationObject = locationObj;
    this.loadingUIComponent = loadingUIComponent;
    this.errMessageUIComponent = errMessageUIComponent;
    this.url = url;
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      try {
        const request = new Request(this.requestPayload, this.url);
        const adminRequestHandler = new AdminRequestHandler(
          this.locationObject,
          this.loadingUIComponent,
          this.errMessageUIComponent
        );
        const instructorRequestHandler = new InstructorRequestHandler(
          this.locationObject,
          this.loadingUIComponent,
          this.errMessageUIComponent
        );
        const studentRequestHandler = new StudentRequestHandler(
          this.locationObject,
          this.loadingUIComponent,
          this.errMessageUIComponent
        );
        adminRequestHandler.next(instructorRequestHandler);
        instructorRequestHandler.next(studentRequestHandler);
        await adminRequestHandler.handleRequest(request);
      } catch (err) {
        reject(err);
      }
    });
  }

  //async stop() {}
}

export { UserAuthService };
