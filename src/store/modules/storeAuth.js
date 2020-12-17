//store/modules/auth.js

import axios from "axios";
import router from "../../router";

const storeAuth = {
  namespaced: true,
  state: {
    stateUser: null,
    stateIsAuthenticated: false
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
      axios.post("Login").then(res => {
          // console.log("then block ", res.data);
          // our api is returning error in res.data in case of un authentication
          // otherwise returns token in res.data
          if (res.data === "error") {
            console.log("do not authenticate");
          } else {
            console.log("authenticate");
            commit("mutateStateUser", User.username);
            commit("mutateStateIsAuthenticated");
            router.push("/");
          }
        }).catch(error => {
          console.log(
            "catch block ",
            error.message || error.response.data.message
          );
        });
    },
    async LogOut({ commit }) {
      commit("mutateLogout");
    }
  },
  mutations: {
    mutateStateUser(state, username) {
      state.stateUser = username;
    },
    mutateStateIsAuthenticated(state) {
      state.stateIsAuthenticated = true;
    },
    mutateLogout(state) {
      state.stateUser = null;
      state.stateIsAuthenticated = false;
    }
  }
};

export default storeAuth;
