<template>
  <q-page style="width:100vw;height:100vh">
    <div id="map"/>
    <!-- <l-map
      ref="vmap"
      :zoom="zoom"
      :center="center"
      :crs = "crs"
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
      <l-geo-json
        :geojson="geo.geojson"
        :options="options"
        :options-style="styleFunction"
      />
    </l-map>-->
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "proj4leaflet";
import { mapProvider } from "../utilities/MapProviders";
// import {
//   LIcon,
//   LPopup,
//   LTooltip,
//   LControlLayers,
//   LControlZoom,
//   LControlScale,
//   LControlAttribution,
//   LGeoJson
// } from "vue2-leaflet";

import GeoModule from "../store/geo";
import { GeoJsonObject } from "geojson";

@Component({
  // components: {
  //   LIcon,
  //   LPopup,
  //   LTooltip,
  //   LControlLayers,
  //   LControlZoom,
  //   LControlScale,
  //   LControlAttribution,
  //   LGeoJson
  // }
})
class MapPage extends Vue {
  // @ts-ignore
  map: L.Map = null
  // @ts-ignore
  geojsonLayer: L.GeoJSON = null

  // crs = new new L.Proj.CRS('EPSG:4549',
  //   '+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs',
  //   {
  //     resolutions: [
  //       156367.7919628329  // 0
  //       ,78183.89598141646
  //       ,39091.94799070823
  //       ,19545.973995354114
  //       ,9772.986997677057
  //       ,4886.4934988385285
  //       ,2443.2467494192642
  //       ,1221.6233747096321
  //       ,610.8116873548161
  //       ,305.40584367740803
  //       ,152.70292183870401
  //       ,76.35146091935201
  //       ,38.175730459676004
  //       ,19.087865229838002
  //       ,9.543932614919001
  //       ,4.7719663074595005
  //       ,2.3859831537297502
  //       ,1.1929915768648751
  //       ,0.5964957884324376
  //       ,0.2982478942162188  // 19
  //     ]
  //   }
  // );
  mapOptions = {
    zoom: 10,
    center: L.latLng(33.4, 119.2),
    crs: L.CRS.EPSG3857,
    zoomControl: false,
    attributionControl: false
  };
  // tileProviders = [
  //   {
  //     name: "OpenStreetMap",
  //     visible: true,
  //     url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   },
  //   {
  //     name: "mapbox",
  //     visible: false,
  //     url:
  //       "http://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaHVheGsiLCJhIjoiY2pmemNuNzgxMnQ2dTMzcWt3a2Ywcm0xcSJ9.FRjTKxWUap7E7CrpPfzFPg"
  //   }
  // ];

  geo = getModule(GeoModule, this.$store);

  mounted() {
    this.initMap()
  }

  @Watch('geo.geojson')
  onMapData(data: GeoJsonObject) {
    if(this.map) this.updateMapData(data)
  }

  styleFunction() {
    return {
      fill: false
    }
  }

  initMap() {
    this.map = L.map("map", this.mapOptions);

    let gaoDeNormal = mapProvider('GaoDe.Normal.Map')
    let gaoDeImgm = mapProvider('GaoDe.Satellite.Map')
    let gaoDeImga = mapProvider('GaoDe.Satellite.Annotion')
    let gaoDeImage = L.layerGroup([gaoDeImgm, gaoDeImga])

    let tianDiTuNormalm = mapProvider('TianDiTu.Normal.Map')
    let tianDiTuNormalz = mapProvider('TianDiTu.Normal.Annotion')
    let tianDiTuImgm = mapProvider('TianDiTu.Satellite.Map')
    let tianDiTuImga = mapProvider('TianDiTu.Satellite.Annotion')
    let tianDiTuNormal = L.layerGroup([tianDiTuNormalm, tianDiTuNormalz])
    let tianDiTuImage = L.layerGroup([tianDiTuImgm, tianDiTuImga])

    let geoqNormal = mapProvider('Geoq.Normal.Map', {maxZoom: 18, minZoom: 5})
    let geoqHydro = mapProvider('Geoq.Theme.Hydro', {maxZoom: 18, minZoom: 5})

    let googleNormal = mapProvider('Google.Normal.Map')
    let googleImage = mapProvider('Google.Satellite.Map')

    let osmNormal = mapProvider('OSM.Normal.Map')

    let baseLayers = {
      '高德地图': gaoDeNormal,
      '高德影像': gaoDeImage,
      '天地图地图': tianDiTuNormal,
      '天地图影像': tianDiTuImage,
      '智图地图': geoqNormal,
      '智图水系': geoqHydro,
      'google地图': googleNormal,
      'google影像': googleImage,
      'OSM地图': osmNormal
    }
    let overlayLayers = {}

    gaoDeNormal.addTo(this.map)
    L.control.layers(baseLayers, overlayLayers).addTo(this.map)
  }

  addBaseLayer() {

  }

  updateMapData(data: GeoJsonObject) {
    if(this.geojsonLayer != null) {
      this.map.removeLayer(this.geojsonLayer)
    }
    this.geojsonLayer = L.geoJSON(data, {style: this.styleFunction})
    this.geojsonLayer.addTo(this.map)
  }
}

export default MapPage;
</script>

<style>
#map {
  height: 100%;
}
</style>
