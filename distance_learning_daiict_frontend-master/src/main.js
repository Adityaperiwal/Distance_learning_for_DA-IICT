// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './adminApp'
import router from './router/index'
import colors from 'vuetify/es5/util/colors'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VRadioGroup,
  VCard,
  VTextField,
  VForm,
  VSelect,
  VDialog,
  VMenu,
  VDivider,
  VDataTable,
  VCarousel,
  VTooltip,
  VProgressLinear,
  VSubheader,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VTextField,
    VForm,
    VSelect,
    VDialog,
    VDivider,
    VMenu,
    VDataTable,
    VRadioGroup,
    VCarousel,
    VTooltip,
    VProgressLinear,
    VSubheader,
    transitions
  },
  theme: {
    primary: colors.purple.base,
    secondary: colors.cyan.darken1,
    accent: colors.shades.black,
    error: colors.orange.accent3,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
