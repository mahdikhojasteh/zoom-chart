const storeDashboard = {
  namespaced: true,
  state: {
    stateBarColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    stateBarImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    stateDrawer: null
    //stateBarColor
  },
  getters: {
    // getStateBarColor
  },
  actions: {
    // actCrudEntity
    actUpdateBarImage({ commit }, payload) {
      commit("mutateStateBarImage", payload);
    },
    actUpdateDrawer({ commit }, payload) {
      commit("mutateStateDrawer", payload);
    }
  },
  mutations: {
    // mutateStateName
    mutateStateBarImage(state, data) {
      state.stateBarImage = data;
    },
    mutateStateDrawer(state, payload) {
      state.stateDrawer = payload;
    }
  }
};

export default storeDashboard;
