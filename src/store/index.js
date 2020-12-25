import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import storeAuth from "./modules/storeAuth";
import storeDashboard from "./modules/storeDashboard";
import storeChartData from "./modules/storeChartData";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    storeAuth,
    storeDashboard,
    storeChartData
  },
  plugins: [
    createPersistedState({
      paths: ["storeAuth"]
    })
  ]
});
