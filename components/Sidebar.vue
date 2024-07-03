<template>
  <div class="sidebar">
    <div class="image-wrapper">
      <img class="image" src="/marker.jpeg" alt="" />
      <h1 style="font-size: 25px;">Dicky Haruman</h1>
      <span>CircleGeo Test</span>
    </div>
    <ul>
      <li>
        <div class="input-wrapper">
          <label for="line" class="label">Line</label>
          <input
            v-model="isLine"
            @change="toggleLine"
            type="checkbox"
            name="line"
            id="line"
          />
        </div>
      </li>
      <li>
        <div class="input-wrapper">
          <label for="polygon" class="label">Polygon</label>
          <input
            v-model="isPolygon"
            @change="togglePolygon"
            type="checkbox"
            name="polygon"
            id="polygon"
          />
        </div>
      </li>
      <li>
        <div class="input-wrapper">
          <label for="circle" class="label">Circle</label>
          <input
            v-model="isCircle"
            @change="toggleCircle"
            type="checkbox"
            name="circle"
            id="circle"
          />
        </div>
      </li>
      <li>
        <div class="input-wrapper">
          <label for="custom-marker" class="label">Custom Marker</label>
          <input
            v-model="isCustomMarker"
            @change="toggleCustomMarker"
            type="checkbox"
            name="custom-marker"
            id="custom-marker"
          />
        </div>
      </li>
      <li>
        <div class="input-wrapper">
          <label for="default-marker" class="label">Default Marker</label>
          <input
            v-model="isDefaultMarker"
            @change="toggleDefaultMarker"
            type="checkbox"
            name="default-marker"
            id="default-marker"
          />
        </div>
      </li>
      <li>
        <div class="input-wrapper">
          <label for="vector-tiles" class="label">Vector Tiles</label>
          <input
            v-model="isTiles"
            @change="toggleTiles"
            type="checkbox"
            name="vector-tiles"
            id="vector-tiles"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const isLine = ref(true);
const isPolygon = ref(true);
const isCircle = ref(true);
const isDefaultMarker = ref(true);
const isCustomMarker = ref(true);
const isTiles = ref(true)

const emit = defineEmits([
  "toggle-line",
  "toggle-polygon",
  "toggle-circle",
  "toggle-custom-marker",
  "toggle-default-marker",
  "toggle-tiles"
]);

const toggleLine = () => {
  emit("toggle-line", isLine.value);
};

const togglePolygon = () => {
  emit("toggle-polygon", isPolygon.value);
};

const toggleCircle = () => {
  emit("toggle-circle", isCircle.value);
};

const toggleCustomMarker = () => {
  emit("toggle-custom-marker", isCustomMarker.value);
};

const toggleDefaultMarker = () => {
  emit("toggle-default-marker", isDefaultMarker.value);
};

const toggleTiles = () => {
  emit("toggle-tiles", isTiles.value)
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: rgba(244, 244, 244, 0.85);
  padding: 15px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* Adds the glass effect */
  border-radius: 10px; /* Optional: adds rounded corners */
}
.sidebar h2 {
  margin-top: 0;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar ul li {
  margin: 10px 0;
}
.sidebar ul li a {
  text-decoration: none;
  color: #333;
}
.image {
  width: 150px;
  border-radius: 100%;
  margin-bottom: 20px;
}
.image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.label {
  font-size: 18px;
}

input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin-right: 5px; 
    cursor: pointer; 
  }
</style>
