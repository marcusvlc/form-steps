<template>
  <input
    :class="[variant, size]"
    @click.prevent="emit('onClick')"
    class="app-btn"
    type="submit"
    :value="text"
  />
</template>

<script setup>
import ButtonColorVariant from "../../enums/button/ButtonColorVariant";
import ButtonSize from "../../enums/button/ButtonSize";

const props = defineProps({
  variant: { type: String, default: ButtonColorVariant.PRIMARY },
  size: { type: String, default: ButtonSize.SMALL },
  text: { type: String, default: "Continuar" },
});

const emit = defineEmits(["onClick"]);
</script>

<style lang="scss" scoped>
@import "@/styles/colors";

.app-btn {
  height: 35px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.sm {
  width: 50%;
}

.md {
  width: 100%;
}

.primary {
  background-color: $orange;
  color: $white;
}

.primary:hover {
  background-color: $white;
  color: $orange;
  border: 1px solid $orange;
}

.secondary {
  background-color: $white;
  color: $orange;
  border: 1px solid $orange;
}

.secondary:hover {
  background-color: $orange;
  color: $white;
}
</style>
