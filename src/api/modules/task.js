import {postRequest} from "@/api/base";
import {getMockData} from "@/api/mock";
import store from "@/store"
import {getRequest} from "../base";

const debug = false;

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

function getAvailableTasks(params) {
  console.log(params);
  return debug ? getMockData('task') : getRequest('readmultiple', {
    columnSet: ["*"],
    objectType: "UsrTask",
    userId: store.state.user.user.userId,
    filterConnector: {
      subFiltersConnection: "And",
      subFilters:
        [
          {
            fieldName: "UsrStatus",
            comparisonType: "EQUAL",
            rightType: "CONSTANT",
            rightValue: "NEW",
            rightValueType: "String"
          }
        ]
    }
  })
}

export {
  getAvailableTasks,
  createTask
}
