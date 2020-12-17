import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storeAuth from "./modules/storeAuth";
import storeDashboard from "./modules/storeDashboard";

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    storeAuth,
    storeDashboard
  },
  plugins: [
    createPersistedState({
      paths: ["storeAuth"]
    }),
  ]
});
