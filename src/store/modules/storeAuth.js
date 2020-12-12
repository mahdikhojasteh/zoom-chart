//store/modules/auth.js

import axios from "axios";

const storeAuth = {
  namespaced: true,
  state: {
    stateUser: null,
    stateIsAuthenticated: true
  },
  getters: {
    getStateIsAuthenticated: state => state.stateIsAuthenticated,
    getStateUser: state => state.stateUser
  },
  actions: {
    // async Register({ dispatch }, form) {
    //   await axios.post("register", form);
    //   let UserForm = new FormData();
    //   UserForm.append("username", form.username);
    //   UserForm.append("password", form.password);
    //   await dispatch("LogIn", UserForm);
    // },

    actLogInUser({ commit }, User) {
      axios.defaults.headers.post["username"] = User.username;
      axios.defaults.headers.post["password"] = User.password;
      axios
        .post("Login")
        .then(res => {
          console.log("then block ", res);
          commit("mutateStateUser", User.username);
          commit("mutateStateIsAuthenticated");
        })
        .catch(error => {
          console.log(
            "catch block ",
            error.message || error.response.data.message
          );
        });
    },
    async LogOut({ commit }) {
      let user = null;
      commit("mutateLogout", user);
    }
  },
  mutations: {
    mutateStateUser(state, username) {
      state.user = username;
    },
    mutateStateIsAuthenticated(state) {
      state.isAuthenticated = true;
    },
    mutateLogout(state) {
      state.user = null;
    }
  }
};

export default storeAuth;
