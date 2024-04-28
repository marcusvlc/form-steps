<template>
  <input
    :class="[getClass(), busyClass, size]"
    @click.prevent="emit('onClick')"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    class="app-btn"
    type="submit"
    :value="currentText"
  />
</template>

<script setup>
import ButtonColorVariant from "../../enums/button/ButtonColorVariant";
import ButtonSize from "../../enums/button/ButtonSize";
import { ref, computed } from "vue";

const props = defineProps({
  variant: { type: String, default: ButtonColorVariant.PRIMARY },
  size: { type: String, default: ButtonSize.SMALL },
  text: { type: String, default: "Continuar" },
  busy: { type: Boolean, default: false },
});

const isHovering = ref(false);

const getClass = () => {
  if (isHovering.value && props.variant === ButtonColorVariant.PRIMARY)
    return ButtonColorVariant.SECONDARY;

  if (isHovering.value && props.variant === ButtonColorVariant.SECONDARY)
    return ButtonColorVariant.PRIMARY;

  return props.variant;
};

const currentText = computed(() => (props.busy ? "" : props.text));

const busyClass = computed(() => (props.busy ? "btn-busy" : ""));

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

.btn-busy {
  background: url("@/assets/loading.gif") no-repeat center;
  pointer-events: none;
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

.secondary {
  background-color: $white;
  color: $orange;
  border: 1px solid $orange;
}
</style>
