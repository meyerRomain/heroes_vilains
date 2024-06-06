import Vuex from 'vuex'

import errors from "@/store/errors";
import main from "@/store/main";
import secret from "@/store/secret"
import Vue from "vue";


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    errors,
    main,
    secret
  }
})