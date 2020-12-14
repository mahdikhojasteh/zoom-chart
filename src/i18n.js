import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "vuetify/lib/locale/en";
import fa from "vuetify/lib/locale/fa";

Vue.use(VueI18n);

const messages = {
  en: {
    ...require("@/locales/en.json"),
    $vuetify: en
  },
  fa: {
    ...require("@/locales/fa.json"),
    $vuetify: fa
  }
};

export default new VueI18n({
  // locale: process.env.VUE_APP_I18N_LOCALE || "en",
  locale: "fa",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages
});
