import {RESET_USER, SET_TOKEN, SET_USER, INSERT_TASK} from "@/store/mutation-types";
import * as ApiTask from "@/api/modules/task";

const state = {
  task: {
    taskId: null,
    name: null,
    value: null,
  }
};

// const getters = {
//   checkToken:
//     (state) => {
//       return !!window.$cookies.get('access_token') || !!state.user.access_token;
//     }
// };

const actions = {
  signUserUp({commit}, payload) {
    return ApiUser.signUpIn(payload).then((response) => {
      if (response.data.hasOwnProperty('access_token')) {
        commit(SET_USER, response.data);
        this.dispatch('saveTokenToCookies', response.data.access_token);

        return true;
      }
      return false;
    })
  },
  logUserOut({commit}) {
    commit(RESET_USER);
    return {success: true}
  },
  reloadTokenFromCookies({commit}) {
    let token = window.$cookies.get('access_token');
    if (token) commit(SET_TOKEN, token);
  },
  saveTokenToCookies({commit}, payload) {
    if (payload) window.$cookies.set('access_token', payload, "42d");
  },
  openTask() {
    return {success: true}
  },
  createTask({commit}, payload) {
    return ApiTask.createTask(payload);
  },
  getTasks() {
    return ApiTask.getTasks();
  }
};

const mutations = {
  [INSERT_TASK]: (state, payload) => {
    state.task = {
      taskId: payload.taskId,
      name: payload.name,
      value: payload.value
    }
  }
};

export default {
  state,
  mutations,
  actions
};
