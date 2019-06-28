import { Module, VuexModule, Mutation, Action, MutationAction } from "vuex-module-decorators";
import axios from 'axios'
import { FeatureCollection } from "geojson";

@Module({namespaced: true, name: 'geo'})
export default class GeoModule extends VuexModule {
  public geojson: FeatureCollection = { type: "FeatureCollection", features: []}

  @Mutation
  updateGeojson(data: FeatureCollection) {
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
