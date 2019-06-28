<template>
  <q-page style="width:100vw;height:100vh">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
    >
      <l-control-scale :imperial=true position="topleft" />
      <l-control-zoom position="topleft" />
      <l-control-layers
        position="topleft"
        :collapsed=true
        :sort-layers="true"
      />
      <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        layer-type="base"
      />
      <!-- <l-tile-layer :url="url"></l-tile-layer> -->
      <l-geo-json
        :geojson="geo.geojson"
        :options="options"
        :options-style="styleFunction"
      />
    </l-map>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import * as L from "leaflet";
import "proj4leaflet";
// import * as proj4 from 'proj4';
import {
  LIcon,
  LPopup,
  LTooltip,
  LControlLayers,
  LControlZoom,
  LControlScale,
  LControlAttribution,
  LGeoJson
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import GeoModule from "../store/geo";

@Component({
  components: {
    LIcon,
    LPopup,
    LTooltip,
    LControlLayers,
    LControlZoom,
    LControlScale,
    LControlAttribution,
    LGeoJson
  }
})
class MapPage extends Vue {
  zoom = 10;
  center = L.latLng(33.4, 119.2 );
  // crs = new L.Proj.CRS('EPSG:3006',
  //   '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', {
  //       resolutions: [
  //           8192, 4096, 2048, 1024, 512, 256, 128
  //       ],
  //       origin: [0, 0],
  //       bounds: L.bounds([218128.7031, 6126002.9379], [1083427.2970, 7692850.9468])
  // });
  mapOptions = {
    zoomControl: false,
    attributionControl: false,
    zoomSnap: true
  };
  tileProviders = [
    {
      name: "OpenStreetMap",
      visible: true,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    {
      name: "mapbox",
      visible: false,
      url: "http://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHVheGsiLCJhIjoiY2pmemNuNzgxMnQ2dTMzcWt3a2Ywcm0xcSJ9.FRjTKxWUap7E7CrpPfzFPg"
    }
  ];
  // url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  // token = "access_token=pk.eyJ1IjoiaHVheGsiLCJhIjoiY2pmemNuNzgxMnQ2dTMzcWt3a2Ywcm0xcSJ9.FRjTKxWUap7E7CrpPfzFPg"

  geo = getModule(GeoModule, this.$store)

  get options() {
    return {
      // onEachFeature: this.onEachFeatureFunction
    }
  }

  get styleFunction() {
    return () => {
      return {
        fill: false
      }
    }
  }
}

export default MapPage;
</script>
