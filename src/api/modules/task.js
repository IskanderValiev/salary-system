import {postRequest} from "@/api/base";
import {getMockData} from "@/api/mock";

const debug = false;

function addTask(params) {
  return new Promise((resolve, reject) => {
    createTask(params)
      .then((response) => {
        createTask({
          name: response.data.name,
          description: response.data.description,
        }).then((response) => {
          resolve(response);
        })
      })
      .catch((error) => {
        reject(error);
      });
  })
}

function createTask(params) {
  return debug ? getMockData('task') : postRequest('registration', params);
}

// function signUserIn(params) {
//   return debug ? getMockData('user') : postRequest('token', params);
// }

export {
  addTask,
  createTask
}
