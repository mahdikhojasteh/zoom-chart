<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />
  
    <dashboard-core-view />

    <dashboard-core-settings />
    
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: 'DashboardIndex',
    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
    },
    data: () => ({
      expandOnHover: false,
    }),
    methods: {
      ...mapActions('storeAuth', ['LogOut']),
    },
    onIdle () {
      this.LogOut().then(() => {
          this.$router.push({ name: 'Login' });
      })
    },

  }
</script>
