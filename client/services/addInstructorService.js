import { serverConfig } from '../serverConfig/serverConfig.js';

class AddInstructorService {
  constructor(reqPayload) {
    this.reqPayload = reqPayload;
  }

  async start() {
    const url = `${serverConfig.backendServer}/ExamApp/api/v1/Instructor`;
    return new Promise(async (resolve, reject) => {
      if (this.reqPayload) {
        try {
          const serverResponse = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': window.localStorage.getItem('adminToken'),
            },
            body: JSON.stringify(this.reqPayload),
          });
          const formattedResponse = await serverResponse.json();
          console.log(formattedResponse);
          //all are ok
          resolve(formattedResponse);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('you must pass payload to complete the request'));
      }
    });
  }
}

export { AddInstructorService };
