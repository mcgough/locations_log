import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import apolloProvider from "./graphql/apolloProvider";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueApollo);

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount("#app");
