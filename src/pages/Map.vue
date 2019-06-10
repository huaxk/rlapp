<template>
  <q-layout view="hhr lpr ffr">
    <q-drawer v-model="drawerRight" side="right" bordered>
      <div class="q-pa-sm">
        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page style="width:100vw;height:100vh">
        <div style="height: 31%; overflow: auto;">
          <h3>Simple map</h3>
          <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
          <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
          <button @click="showLongText">Toggle long popup</button>
        </div>
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" :attribution="attribution"/>
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
        <q-page-sticky position="right" :offset="[-20, 0]" style="z-index:999">
          <q-btn
            round
            color="primary"
            icon="arrow_upward"
            class="rotate-270"
            @click="drawerRight=!drawerRight"
          />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as L from "leaflet";
import {
  // LMap,
  // LTileLayer,
  // LMarker,
  LIcon,
  LPopup,
  LTooltip
} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

@Component({
  components: {
    // LMap,
    // LTileLayer,
    // LMarker,
    LIcon,
    LPopup,
    LTooltip
  }
})
class MapPage extends Vue {
  drawerRight = false;
  zoom = 13;
  center = L.latLng(47.41322, -1.219482);
  url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
  attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  withPopup = L.latLng(47.41322, -1.219482);
  withTooltip = L.latLng(47.41422, -1.250482);
  currentZoom = 11.5;
  currentCenter = L.latLng(47.41322, -1.219482);
  showParagraph = false;
  mapOptions = {
    zoomSnap: 0.5
  };
  zoomUpdate(zoom) {
    this.currentZoom = zoom;
  }
  centerUpdate(center) {
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
