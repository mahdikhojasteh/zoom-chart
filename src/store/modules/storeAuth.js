//store/modules/auth.js

import axios from "axios";
// import router from "../../router";//if we need to straight push from store

const storeAuth = {
  namespaced: true,
  state: {
    stateUser: null,
    stateIsAuthenticated: false,
    stateToken: null
  },
  getters: {
    getStateIsAuthenticated: state => state.stateIsAuthenticated,
    getStateUser: state => state.stateUser,
    getStateToken: state => state.stateToken,
  },
  actions: {
    // actLogin(context, User){
    //   return new Promise((resolve, reject) => {
    //     axios.defaults.headers.post["username"] = User.username;
    //     axios.defaults.headers.post["password"] = User.password;
    //     axios.post('Login', {
    //       username: usercredentials.username,
    //       password: usercredentials.password
    //     })
    //       .then(response => {
    //         context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh }) 
    //         resolve()
    //       })
    //       .catch(err => {
    //         reject(err)
    //       })
    //   })
    // },
    actLogInUser({ commit }, User){
      return new Promise((resolve, reject) => {
        axios.defaults.headers.post["username"] = User.username;
        axios.defaults.headers.post["password"] = User.password;
        axios.post("Login").then(res => {
          /* our api is returning error in res.data in case of un authentication
          otherwise returns token in res.data */
          if (res.data === "error") {  //---------- reject -----------
            console.log("401 unauthorized!!! from store.actLogInUser");
            reject('401 unauthorized!!!'); 
          } else {
            console.log("200ok auth success!!! from store.actLogInUser");
            console.log("token ", res.data);
            const today = new Date();
            const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            console.log('login time:', time);
            commit("mutateStateToken", res.data);
            commit("mutateStateUser", User.username);
            commit("mutateStateIsAuthenticated");
            resolve();                //------------ resolve ----------
          }
        }).catch(error => {// for now it's not used because of backend implementation
            console.log("catch block ",
            error.message || error.response.data.message);
            reject(error);
        });
      })
    },
    LogOut({ commit }) {
      const today = new Date();
      const time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
      console.log('logout time:', time);
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
    mutateStateToken(state, token) {
      state.stateToken = token;
    },
    mutateLogout(state) {
      state.stateUser = null;
      state.stateIsAuthenticated = false;
      // also make token null
      state.stateToken = null;
    }
  }
};

export default storeAuth;
