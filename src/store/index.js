import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";
import storeAuth from "./modules/storeAuth";
import storeDashboard from "./modules/storeDashboard";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   isAuthenticated:true,
  // },
  modules: {
    storeAuth,
    storeDashboard
  }

  // plugins: [
  //   createPersistedState({
  //     paths: ["auth", "dashboard"]
  //   }),
  // ],

  // //Generic mutations
  // mutations: {
  //   setItems(state, {resource, items}) {
  //     state[resource].items = items
  //   },
  //   setItem(state, {resource, item}) {
  //     state[resource].item = item
  //   }
  // }
});
