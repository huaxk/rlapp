import Vue from 'vue';
import { AxiosStatic } from "axios";
import VueRouter from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $q: any;
    $axios: AxiosStatic;
    loading: boolean;
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $router: VueRouter
  }
}