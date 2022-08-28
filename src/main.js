import Vue from "vue";
import filters from "./filters";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import VueTheMask from "vue-the-mask";
import VueResource from "vue-resource";
import ImageUploader from "vue-image-upload-resize";
import VueToast from "vue-toast-notification";
import { Datetime } from "vue-datetime";
import { Settings } from "luxon";
import "vue-datetime/dist/vue-datetime.css";
import JsonExcel from "vue-json-excel";
import "vue-toast-notification/dist/theme-sugar.css";
import { store } from "./store/store";
import { func } from "./plugins/alert";
import { MediaQueries, CommonBands } from "vue-media-queries";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import money from "v-money";
import PercentInput from "vue-percent-input";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "../src/assets/scss/_main.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./registerServiceWorker";

const mediaQueries = new MediaQueries({
  bands: CommonBands.Bootstrap4,
});
const router = new VueRouter({
  mode: "history",
  routes,
});

Settings.defaultLocale = "pt-BR";
Vue.component("downloadExcel", JsonExcel);
Vue.use(Datetime);
Vue.use(VueToast, {
  position: "top-right",
});
Vue.use(ImageUploader);
Vue.use(VueTheMask);
Vue.use(mediaQueries);
Vue.prototype.$func = func;
Vue.component("pagination", require("laravel-vue-pagination"));
Vue.use(PercentInput);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(filters);
Vue.use(money, {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  suffix: "",
  precision: 2,
  masked: false,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({
        name: "login",
      });
    } else {
      next({});
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next({});
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
  mediaQueries: mediaQueries,
  mixins: [CommonBands.Bootstrap4.mixin],
}).$mount("#app");
