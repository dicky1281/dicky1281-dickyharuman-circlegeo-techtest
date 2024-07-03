<template>
  <div class="animation-wrapper">
    <img src="/animation.gif" alt="" />
    <h1>BISMILLAH MASUK CIRCLEGEO LETS GO!!</h1>
    <div class="loading-progress-wrapper">
      <div
        class="loading-progress"
        :style="{ width: loadingProgress + '%' }"
      ></div>
    </div>

    <h1 style="font-size: 20px">Created By Dicky Putra Haruman</h1>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";


const emit = defineEmits(['stopLoading'])

const loadingProgress = ref(0);

const startLoading = () => {
  const loadingInterval = 500;
  let loadingTimer = null;
  loadingTimer = setInterval(() => {
    loadingProgress.value += 10;
    if (loadingProgress.value >= 100) {
      clearInterval(loadingTimer);
      loadingProgress.value = 100;
      emit('stopLoading')
    }
  }, loadingInterval);
};

onMounted(() => {
  startLoading();
});
</script>

<style scoped>
.animation-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.animation-wrapper h1 {
  font-weight: 700;
  margin-top: 50px;
  font-size: 30px;
  color: cadetblue;
  margin-bottom: 50px;
}

.loading-progress {
  width: 0%;
  height: 100%;
  background-color: #3498db;
  transition: width 0.5s ease;
}
.loading-progress-wrapper {
  width: 300px;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
}
</style>
