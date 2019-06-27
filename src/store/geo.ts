import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import axios from 'axios'

@Module({namespaced: true, name: 'geo'})
export default class GeoModule extends VuexModule {
  // public static namespaced = true

  public geojson: Array<object> = []

  @Mutation
  updateGeojson(data: Array<object>) {
    this.geojson = data
  }

  @Action({ commit: 'updateGeojson' })
  async loadgeo() {
    const resp = await axios.get("cities")
    // this.context.commit('updateGeojson', resp.data)
    return resp.data
  }

  @MutationAction({ mutate: ['geojson']})
  async loadmutategeo() {
    const resp = await axios.get("cities")
    return {geojson: resp.data}
  }
}
