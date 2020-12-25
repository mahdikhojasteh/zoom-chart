import axios from "axios";
import obamaBudget from "@/store/modules/obama";

const storeChartData = {
  namespaced: true,
  state: {
    stateObamaBudget: null
  },
  getters: {
    getStateObamaBudget: state => state.stateObamaBudget
  },
  actions: {
    actGetObamaBudget({ commit }) {
      return new Promise((resolve, reject) => {
        // axios
        //   .get(
        //     "https://echarts.apache.org/examples/data/asset/data/obama_budget_proposal_2012.list.json"
        //   )
        //   .then(res => {
        //     commit("mutateStateObamaBudget", res.data);
        //     resolve();
        //   })
        //   .catch(err => {
        //     reject(err);
        //   });
        commit("mutateStateObamaBudget", obamaBudget);
        setTimeout(() => {
          resolve(true);
        }, 6000);
      });
    }
  },
  mutations: {
    mutateStateObamaBudget(state, data) {
      state.stateObamaBudget = data;
    }
  }
};

export default storeChartData;
