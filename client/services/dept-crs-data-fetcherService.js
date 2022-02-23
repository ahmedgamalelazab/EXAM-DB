/**
 * @description this service take input : UI OF TYPE WRAPPER example ui or li item
 *
 */
class DeptCrsDataFetcher {
  constructor(UIComponent, url, UIType) {
    this.UIComponent = UIComponent; // [x]
    this.url = url;
    this.UIType = UIType;
    this.deptReqMapper = {};
    this.crsReqMapper = {};
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      if (this.UIComponent && this.UIType && this.url) {
        //^ it will handle two requests from the internet
        //^ 1. fetch all the departments from the internet [authenticated request]
        //^ 2. fetch all the courses from the internet [authenticated request]
        //^ 3. inject the result into the ui component
        console.log('begin');
        console.log(this.UIComponent);
        console.log('end');
        try {
          const serverResponse = await fetch(this.url, {
            method: 'GET',
            headers: {
              'x-auth-token': window.localStorage.getItem('adminToken'),
            },
          });
          const result = await serverResponse.json(); //[SUCCESS , Data]
          const { success, data } = result;
          if (success) {
            switch (this.UIType) {
              case 'course':
                data.forEach(object => {
                  //^ insert data dynamically
                  $(this.UIComponent).append(`
                  <li>
                    <a id=${object.courseId} class="dropdown-item" href="#">${object.courseName}</a>
                  </li>
                `);
                });
                break;
              case 'department':
                data.forEach(object => {
                  //^ insert data dynamically
                  $(this.UIComponent).append(`
                  <li>
                  <a id=${object.id} class="dropdown-item" href="#">${object.name}</a>
                   </li>
                `);
                });
                break;
              default:
                data.forEach(object => console.log(object.name));
                //^ insert data dynamically
                $(this.UIComponent).append(`
                    
                `);
                break;
            }

            //listen on each one of them
          } else {
            reject(new Error('success failed while fetching UIComponent data'));
          }
          console.log(result);
          resolve(result);
        } catch (err) {
          reject(err);
        }
        //update the components //^[UI COMPONENTS] each one
      } else {
        reject(
          new Error(
            'U Must provide a ui Component  && url && payload to launch the service successfully!'
          )
        );
      }
    });
  }
}

export { DeptCrsDataFetcher };
