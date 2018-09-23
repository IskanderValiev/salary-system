import {postRequest} from "@/api/base";
import {getMockData} from "@/api/mock";
import store from "@/store"

const debug = false;

function addTask(params) {
  return new Promise((resolve, reject) => {
    createTask(params)
      .then((response) => {
        createTask({
          AttributesCollection: [
            {
              name: "UsrName",
              value: response.data.name,
              type: "string"
            },
            {
              name: "UsrDescription",
              value: response.data.description,
              type: "string"
            },
            {
              name: "UsrDifficulty",
              value: 1,
              type: "Int32"
            },
            {
              name: "UsrStatus",
              value: "NEW",
              type: "String"
            }
          ],
          objectType: "UsrTask",
          userId: store.state.user.user.userId
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
  console.log(params);
  return debug ? getMockData('task') : postRequest('create', {
    AttributesCollection: [
      {
        name: "UsrName",
        value: params.name,
        type: "string"
      },
      {
        name: "UsrDescription",
        value: params.description,
        type: "string"
      },
      {
        name: "UsrDifficulty",
        value: 1,
        type: "Int32"
      },
      {
        name: "UsrStatus",
        value: "NEW",
        type: "String"
      }
    ],
    objectType: "UsrTask",
    userId: store.state.user.user.userId
  });
}

// function signUserIn(params) {
//   return debug ? getMockData('user') : postRequest('token', params);
// }

export {
  addTask,
  createTask
}
