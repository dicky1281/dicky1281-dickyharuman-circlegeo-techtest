<template>
  <div class="container">
    <Sidebar
      v-if="!loading"
      @toggle-line="toggleLine"
      @toggle-polygon="togglePolygon"
      @toggle-circle="toggleCircle"
      @toggle-custom-marker="toggleCustomMarker"
      @toggle-default-marker="toggleDefaultMarker"
      @toggle-tiles="toggleTiles"
    />
    <Mymaplibreql
      v-if="!loading"
      :is-line="isLine"
      :is-polygon="isPolygon"
      :is-circle="isCircle"
      :is-custom-marker="isCustomMarker"
      :is-default-marker="isDefaultMarker"
      :is-tiles="isTiles"
    />
    <LoadingContent v-if="loading" @stop-loading="loading = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import "~/assets/css/maplibre.css";

const isLine = ref(true);
const isPolygon = ref(true);
const isCircle = ref(true);
const isDefaultMarker = ref(true);
const isCustomMarker = ref(true);
const isTiles = ref(true);
const loading = ref(true);

const toggleLine = (visible) => {
  isLine.value = visible;
};

const togglePolygon = (visible) => {
  isPolygon.value = visible;
};

const toggleCircle = (visible) => {
  isCircle.value = visible;
};

const toggleCustomMarker = (visible) => {
  isCustomMarker.value = visible;
};

const toggleDefaultMarker = (visible) => {
  isDefaultMarker.value = visible;
};

const toggleTiles = (visible) => {
  isTiles.value = visible;
};
</script>

<style setup>
* {
  padding: 0;
  margin: 0;
  font-family: "Poppins";
}
.container {
  display: flex;
  overflow: hidden;
  position: relative;
}
</style>
