console.log('hello student');
import { AddStudentService } from '../../services/addStudentService.js';
(async () => {
  console.log('hello add instructor');

  // hook
  const form = document.forms[0];
  let reqPayload = {};
  const first_name = document.getElementById('fname-input-field');
  const last_name = document.getElementById('lname-input-field');
  const email = document.getElementById('email-input-field');
  const password = document.getElementById('pawssword-input-field');
  const phone_number = document.getElementById('phone-input-field');

  form.onsubmit = async e => {
    e.preventDefault();
    //^1. preparing the payload
    reqPayload.first_name = first_name.value.toString();
    reqPayload.last_name = last_name.value.toString();
    reqPayload.email = email.value.toString();
    reqPayload.password = password.value.toString();
    reqPayload.phone_number = phone_number.value.toString();
    console.log(reqPayload);
    //^2. preparing the payload
    try {
      await new AddStudentService(reqPayload).start();
    } catch (err) {
      console.log(err);
    }
  };

  //catch errors
})();
