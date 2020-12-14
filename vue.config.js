// const VazirFontsPlugin = require("vazir-font/dist");

module.exports = {
  // plugins: [
  //   new VazirFontsPlugin({
  //     fonts: [{ family: "Vazir-Regular" }]
  //   })
  // ],
  lintOnSave: false,
  devServer: {
    disableHostCheck: true
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "fa",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
