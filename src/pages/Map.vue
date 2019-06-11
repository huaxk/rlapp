<template>
  <q-layout view="hhr lpr ffr">
    <!-- <q-drawer v-model="drawerRight" side="right" bordered>
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-drawer> -->
    <!-- <q-page-container> -->
      <q-page style="width:100vw;height:100vh">
        <!-- <div style="height: 31%; overflow: auto;">
          <h3>Simple map</h3>
          <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
          <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
          <button @click="showLongText">Toggle long popup</button>
        </div> -->
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 100%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
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
            :attribution="tileProvider.attribution"
            :token="token"
            layer-type="base"
          />
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="withPopup">
            <l-popup>
              <div @click="innerClick">I am a popup
                <p
                  v-show="showParagraph"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.</p>
              </div>
            </l-popup>
          </l-marker>
          <l-marker :lat-lng="withTooltip">
            <l-tooltip :options="{permanent: true, interactive: true}">
              <div @click="innerClick">I am a tooltip
                <p
                  v-show="showParagraph"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.</p>
              </div>
            </l-tooltip>
          </l-marker>
        </l-map>
        <!-- <q-page-sticky position="right" :offset="[-20, 0]" style="z-index:999">
          <q-btn
            round
            color="primary"
            icon="arrow_upward"
            class="rotate-270"
            @click="drawerRight=!drawerRight"
          />
        </q-page-sticky> -->
      </q-page>
    <!-- </q-page-container> -->
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import * as L from "leaflet";
import { latLng } from "leaflet";
import {
  // LMap,
  // LTileLayer,
  // LMarker,
  LIcon,
  LPopup,
  LTooltip,
  LControlLayers,
  LControlZoom,
  LControlScale,
  LControlAttribution
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

@Component({
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
    LIcon,
    LPopup,
    LTooltip,
    LControlLayers,
    LControlZoom,
    LControlScale,
    LControlAttribution
  }
})
class MapPage extends Vue {
  drawerRight = false;

  mapOptions = {
    zoomControl: false,
    attributionControl: false,
    zoomSnap: true
  };
  zoom = 10;
  center = latLng(33.4, 119.2 );
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
  url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  token = "access_token=pk.eyJ1IjoiaHVheGsiLCJhIjoiY2pmemNuNzgxMnQ2dTMzcWt3a2Ywcm0xcSJ9.FRjTKxWUap7E7CrpPfzFPg"
  withPopup = latLng(47.41322, -1.219482);
  withTooltip = latLng(47.41422, -1.250482);
  currentZoom = 11.5;
  currentCenter = latLng(47.41322, -1.219482);
  showParagraph = false;

  zoomUpdate(zoom: number) {
    this.currentZoom = zoom;
  }
  centerUpdate(center: any) {
    this.currentCenter = center;
  }
  showLongText() {
    this.showParagraph = !this.showParagraph;
  }
  innerClick() {
    alert("Click!");
  }
}
export default MapPage;
</script>
