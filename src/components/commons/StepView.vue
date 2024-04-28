<template>
  <div class="steps-view">
    <p>
      Etapa
      <span class="steps-view__current-step">{{ currentStep }}</span>
      de
      <span>{{ stepsQty }}</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  currentStep: Number,
  stepsQty: Number,
});
</script>

<style lang="scss" scoped>
@import "@/styles/colors";

.steps-view {
  display: flex;
  align-items: center;

  &__current-step {
    color: $orange;
    font-weight: bold;
  }
}
</style>
