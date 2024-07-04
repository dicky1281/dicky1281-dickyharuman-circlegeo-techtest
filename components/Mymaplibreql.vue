<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const props = defineProps({
  isLine: {
    type: Boolean,
    default: false,
  },
  isPolygon: {
    type: Boolean,
    default: false,
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
  isDefaultMarker: {
    type: Boolean,
    default: false,
  },
  isCustomMarker: {
    type: Boolean,
    default: false,
  },
  isTiles: {
    type: Boolean,
    default: false,
  },
});

const mapContainer = ref(null);
const map = ref(null);
const geojson = ref(null);
const config = useRuntimeConfig()
const marker = ref({
  custom: null,
  default: null,
});

const lineVisible = (visible) => {
  const visibility = visible ? "visible" : "none";
  if (map.value) {
    map.value.setLayoutProperty("line-string-layer", "visibility", visibility);
  }
};

const polygonVisible = (visible) => {
  const visibility = visible ? "visible" : "none";
  if (map.value) {
    map.value.setLayoutProperty("polygon-layer", "visibility", visibility);
  }
};

const circleVisible = (visible) => {
  const visibility = visible ? "visible" : "none";
  if (map.value) {
    map.value.setLayoutProperty("circle-layer", "visibility", visibility);
  }
};

const tilesVisible = (visible) => {
  if (map.value) {
    map.value.setLayoutProperty(
      "raster-tile-layer",
      "visibility",
      visible ? "visible" : "none"
    );
  }
};

const customMarkerVisible = (visible) => {
  if (marker.value.custom) {
    marker.value.custom.getElement().style.display = visible ? "block" : "none";
  }
};

const defaultMarkerVisible = (visible) => {
  if (marker.value.default) {
    marker.value.default.getElement().style.display = visible
      ? "block"
      : "none";
  }
};

const fetchGeojsonData = async () => {
  const response = await fetch("/test.json");
  let result = await response.json();
  geojson.value = {
    lineString: result.features[5],
    polygon: result.features[4],
    custMark: result.features[3],
    circle: result.features[2],
    defMark: result.features[0],
  };
};

watch(
  () => props.isLine,
  (newVal) => {
    lineVisible(newVal);
  },
  { immediate: true }
);

watch(
  () => props.isPolygon,
  (newVal) => {
    polygonVisible(newVal);
  },
  { immediate: true }
);

watch(
  () => props.isCircle,
  (newVal) => {
    circleVisible(newVal);
  },
  { immediate: true }
);

watch(
  () => props.isCustomMarker,
  (newVal) => customMarkerVisible(newVal),
  { immediate: true }
);
watch(
  () => props.isDefaultMarker,
  (newVal) => defaultMarkerVisible(newVal),
  { immediate: true }
);

watch(
  () => props.isTiles,
  (newVal) => tilesVisible(newVal),
  { immediate: true }
);
onMounted(async () => {
  await fetchGeojsonData();

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style:
      `https://api.maptiler.com/maps/streets/style.json?key=${config.public.mapTilesKey}`,
    center: [120, -2.5], // I used Coordinate Indonesia
    zoom: 5,
  });

  map.value.on("load", () => {

    // Vector Tiles / Raster Tile
    map.value.addLayer({
      id: "raster-tile-layer",
      type: "raster",
      source: {
        type: "raster",
        tiles: [
          config.public.vectorTiles,
        ],
        tileSize: 256,
      },
      minzoom: 0,
      maxzoom: 18,
      layout: {
        visibility: props.isTiles ? "visible" : "none",
      },
    });


    // Line String
    map.value.addSource("line-string", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [geojson.value.lineString],
      },
    });

    map.value.addLayer({
      id: "line-string-layer",
      type: "line",
      source: "line-string",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": geojson.value.lineString.properties.lineColor || "#000",
        "line-width": 4,
      },
    });


    // Popup Line String
    map.value.on("click", "line-string-layer", (e) => {
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<h3>Line Properties</h3>
          <p>Color: ${
            geojson.value.lineString.properties.lineColor || "Default Color"
          }</p>`
        )
        .addTo(map.value);
    });

    // Polygon
    map.value.addSource("polygon", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [geojson.value.polygon],
      },
    });

    map.value.addLayer({
      id: "polygon-layer",
      type: "fill",
      source: "polygon",
      layout: {},
      paint: {
        "fill-color": geojson.value.polygon.properties.fillColor || "#888",
        "fill-opacity": 0.5,
        "fill-outline-color":
          geojson.value.polygon.properties.lineColor || "#000",
      },
    });

    // Popup Polygon
    map.value.on("click", "polygon-layer", (e) => {
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<h3>Polygon Properties</h3>
          <p>Fill Color: ${
            geojson.value.polygon.properties.fillColor || "Default Fill Color"
          }</p>
          <p>Line Color: ${
            geojson.value.polygon.properties.lineColor || "Default Line Color"
          }</p>`
        )
        .addTo(map.value);
    });

    // Circle
    map.value.addSource("circle", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [geojson.value.circle],
      },
    });

    map.value.addLayer({
      id: "circle-layer",
      type: "circle",
      source: "circle",
      paint: {
        "circle-color": "red",
        "circle-radius": geojson.value.circle.properties.radius || 10,
      },
    });

    // Popup Circle
    map.value.on("click", "circle-layer", (e) => {
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(
          `<h3>Circle Properties</h3>
          <p>Radius: ${
            geojson.value.circle.properties.radius || "Default Radius"
          }</p>`
        )
        .addTo(map.value);
    });

    // Default Marker + Popup
    marker.value.default = new maplibregl.Marker()
      .setLngLat(geojson.value.defMark.geometry.coordinates)
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<h3>${geojson.value.defMark.properties.name}</h3>`
        )
      )
      .addTo(map.value);

    // Custom Marker + Popup
    const customMarker = document.createElement("div");
    customMarker.className = "custom-marker";
    customMarker.style.backgroundImage = "url(https://placekitten.com/g/30/30)";
    customMarker.style.width = "30px";
    customMarker.style.height = "30px";
    customMarker.style.backgroundSize = "100%";

    marker.value.custom = new maplibregl.Marker(customMarker)
      .setLngLat(geojson.value.custMark.geometry.coordinates)
      .setPopup(
        new maplibregl.Popup().setHTML(
          `<h3>${geojson.value.custMark.properties.name}</h3>`
        )
      )
      .addTo(map.value);

    // Initiate Hide and show layer
    lineVisible(props.isLine);
    polygonVisible(props.isPolygon);
    circleVisible(props.isCircle);
    defaultMarkerVisible(props.isDefaultMarker);
    customMarkerVisible(props.isCustomMarker);
  });
});
</script>

<style>
.map-container {
  width: calc(100% - 250px);
  height: 100vh;
}
.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
.custom-marker {
  background-size: cover;
  width: 50px;
  height: 50px;
  background-image: url("/marker.jpeg");
  border-radius: 50%;
}

.custom-marker svg {
  display: none !important;
}
</style>
