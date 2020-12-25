import axios from "axios";
import store from "../store";

const storeSample = {
  namespaced: true,
  state: {
    stateName: null
  },
  getters: {
    getStateName: state => state.stateName
  },
  actions: {
    actDoSth({ commit }, data) {
      axios
        .get("someURL", {
          headers: {
            Authorization: `Bearer ${store.getters["storeAuth/getStateToken"]}`
          }
        })
        .then(res => {})
        .catch(err => {});
    }
  },
  mutations: {
    mutateStateName(state, data) {
      state.stateName = data;
    }
  }
};

export default storeSample;
