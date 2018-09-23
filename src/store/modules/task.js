import {RESET_USER, SET_TOKEN, SET_USER, INSERT_TASK, SET_TASKS} from "@/store/mutation-types";
import * as ApiTask from "@/api/modules/task";
export const COLUMNS = ["UsrName", "UsrDescription", "UsrDifficulty"];
const state = {
  task: {
    taskId: null,
    name: null,
    value: null,
  },
  columns: COLUMNS,
  tasks: []
};

// const getters = {
//   checkToken:
//     (state) => {
//       return !!window.$cookies.get('access_token') || !!state.user.access_token;
//     }
// };

const actions = {
  openTask() {
    return {success: true}
  },
  createTask({commit}, payload) {
    return ApiTask.createTask(payload);
  },
  getTasks({commit, rootState}) {
    ApiTask.getTasks()
      .then((response) => {
        commit(SET_TASKS, response.data.resultCollection)
      })
  },
  takeTask({commit}, payload) {
    return ApiTask.takeTask(payload)
  },
  makeTaskDone({commit}, payload) {
    return ApiTask.makeTaskDone(payload)
  }
  ,
  getChoosenTasks({commit, rootState}) {
    ApiTask.getChoosenTasks()
      .then((response) => {
        commit(SET_TASKS, response.data.resultCollection)
      })
  }
};

const mutations = {
  [INSERT_TASK]: (state, payload) => {
    state.task = {
      taskId: payload.taskId,
      name: payload.name,
      value: payload.value
    }
  },
  [SET_TASKS]: (state, payload) => {
    state.tasks = payload
  },
};

export default {
  state,
  mutations,
  actions
};
