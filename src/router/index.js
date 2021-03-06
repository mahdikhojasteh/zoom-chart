import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/sstable",
      name: "Sstable",
      component: () => import("@/views/tst/SsPaginationSort")
      // meta: { guest: true },
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("@/views/tst/test")
      // meta: { guest: true },
    },
    {
      path: "/charts",
      name: "Chart",
      component: () => import("@/views/tst/chart")
      // meta: { guest: true },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/dashboard/pages/login")
      // meta: { guest: true },
    },
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      meta: { requiresAuth: true },
      children: [
        // Dashboard
        {
          name: "Dashboard",
          path: "",
          component: () => import("@/views/dashboard/Dashboard")
        },
        // Pages
        {
          name: "User Profile",
          path: "pages/user",
          component: () => import("@/views/dashboard/pages/UserProfile")
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/dashboard/component/Notifications")
        },
        {
          name: "Icons",
          path: "components/icons",
          component: () => import("@/views/dashboard/component/Icons")
        },
        {
          name: "Typography",
          path: "components/typography",
          component: () => import("@/views/dashboard/component/Typography")
        },
        // Tables
        {
          name: "Regular Tables",
          path: "tables/regular-tables",
          component: () => import("@/views/dashboard/tables/RegularTables")
        },
        // Maps
        {
          name: "Google Maps",
          path: "maps/google-maps",
          component: () => import("@/views/dashboard/maps/GoogleMaps")
        },
        // Upgrade
        // {
        //   name: "Upgrade",
        //   path: "upgrade",
        //   component: () => import("@/views/dashboard/Upgrade")
        // }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters['storeAuth/getStateIsAuthenticated'];
  // checking if user already is logged in, push request to home url
  if (to.name === 'Login' && isAuthenticated){
    console.log('beforeEach routes, user already logged in');
    next({name:'Dashboard'});
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('beforeEach routes, isAuthenticated value is: ', isAuthenticated)
    if (isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
