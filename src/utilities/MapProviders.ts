// import * as L from 'leaflet'
import { TileLayer, TileLayerOptions, GridLayerOptions } from 'leaflet';

export const providers: {[key: string]: any} = {
  TianDiTu: {
      Normal: {
          Map: "http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
          Annotion: "http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}"
      },
      Satellite: {
          Map: "http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
          Annotion: "http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
      },
      Terrain: {
          Map: "http://t{s}.tianditu.com/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
          Annotion: "http://t{s}.tianditu.com/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
      },
      Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      key: "174705aebfe31b79b3587279e211cb9a"
  },

  GaoDe: {
      Normal: {
          Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
      },
      Satellite: {
          Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
          Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
      },
      Subdomains: ["1", "2", "3", "4"]
  },

  Google: {
      Normal: {
          Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      },
      Satellite: {
          Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
      },
      Subdomains: []
  },

  Geoq: {
      Normal: {
          Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
          Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
      },
      Theme: {
          Hydro: "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
      },
      Subdomains: []
  },

  OSM: {
      Normal: {
          Map: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      },
      Subdomains: ['a', 'b', 'c']
  }

};

export interface TileLayerOptions extends GridLayerOptions {
  key: string;
}

export class MapProvider extends TileLayer {
  constructor(type: string, options?: TileLayerOptions) {
    let parts = type.split('.')

    let providerName = parts[0]
    let mapName = parts[1]
    let mapType = parts[2]

    let url = providers[providerName][mapName][mapType]
    let opts: TileLayerOptions = options || {}
    opts.subdomains = providers[providerName].Subdomains
    // @ts-ignore
    opts.key = providers[providerName].key
    super(url, opts)
  }
}

export function mapProvider(type: string, options?: TileLayerOptions): MapProvider {
  return new MapProvider(type, options)
}

// declare module 'leaflet' {
//   namespace TileLayer {
//     export class MapProvider{}
//   }
// }
