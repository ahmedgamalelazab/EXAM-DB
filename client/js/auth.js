import { UserAuthService } from '../services/authService.js';

console.log('hello auth');

//1- hook on the ui component
//2- prevent the behaviour of the default form
//3- take the email and password then combine them in a reqPayload
//4- call the service and give her [start] and pass to it's constructor requirements

//hooking

const userForm = document.forms[0];
const email = document.getElementById('inputEmail');
const password = document.getElementById('inputPassword');
import { serverConfig } from '../serverConfig/serverConfig.js';

//UI Components
const loadUIComponent = document.getElementById('loading-spinner-state');
const errMessageComponent = document.getElementById('errorMessageComponent');

userForm.onsubmit = async function (event) {
  event.preventDefault();
  //on submitting
  const reqPayload = {
    email: email.value,
    password: password.value,
  };

  const reqUrl = `${serverConfig.backendServer}/ExamApp/api/v1/login`;

  console.log(reqPayload);
  console.log(reqUrl);

  const authService = new UserAuthService(
    reqPayload,
    reqUrl,
    window.location,
    loadUIComponent,
    errMessageComponent
  );

  try {
    const result = await authService.start();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
