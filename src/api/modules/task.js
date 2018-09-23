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
        value: params.difficulty,
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

function getTasks(params) {
  console.log(params);
  return debug ? getMockData('task') : postRequest('readmultiple', {
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

function getChoosenTasks(params) {
  console.log(params);
  return debug ? getMockData('task') : postRequest('readmultiple', {
    columnSet: ["*"],
    objectType: "UsrTask",
    userId: store.state.user.user.userId,
    filterConnector: {
      subFiltersConnection: "And",
      subFilters:
        [
          {
            fieldName: "UsrUser",
            comparisonType: "EQUAL",
            rightType: "CONSTANT",
            rightValue: store.state.user.user.userId,
            rightValueType: "String"
          },
          {
            fieldName: "UsrStatus",
            comparisonType: "EQUAL",
            rightType: "CONSTANT",
            rightValue: "IN_PROGRESS",
            rightValueType: "String"
          }
        ]
    }
  })
}

function takeTask(params) {
  console.log(params);
  return debug ? getMockData('task') :
    postRequest('update', {
    AttributesCollection: [
      {
        name: "UsrStatus",
        value: "IN_PROGRESS",
        type: "string"
      },
      {
        name: "UsrUser",
        value: store.state.user.user.userId,
        type: "string"
      }
    ],
    objectType: "UsrTask",
    objectId: params.id,
    userId: store.state.user.user.userId
  });
}

export {
  getTasks,
  createTask,
  takeTask,
  getChoosenTasks
}
