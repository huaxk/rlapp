import { Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

delete Icon.Default.prototype._getIconUrl
/* global require */
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default async ({ Vue }) => {
  Vue.component('l-map', LMap)
  Vue.component('l-tile-layer', LTileLayer)
  Vue.component('l-marker', LMarker)
}
