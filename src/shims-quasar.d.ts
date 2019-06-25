import Vue from 'vue';
import { AxiosStatic } from "axios";

declare module 'vue/types/vue' {
  interface Vue {
    $q: any;
    $axios: AxiosStatic;
    loading: boolean;
  }
}
