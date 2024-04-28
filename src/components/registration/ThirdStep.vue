<template>
  <form>
    <label class="text-field field">
      Sua senha
      <input
        class="text-input"
        type="password"
        v-model="formData.password"
        required
      />
    </label>

    <div class="button-container">
      <Button
        @onClick="emit('onBack')"
        size="sm"
        text="Voltar"
        variant="secondary"
      />

      <Button @onClick="onContinue" size="sm" />
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import RegistrationStore from "../../store/RegistrationStore";
import Button from "../commons/Button.vue";
import Validator from "../../utils/Validator";

const emit = defineEmits(["onBack", "onContinue"]);

const formData = reactive({ ...RegistrationStore.registerData });

const onContinue = () => {
  if (!Validator.isValidPassword(formData.password)) {
    return alert("Necessário preencher uma senha");
  }

  emit("onContinue", { ...formData });
};
</script>

<style lang="scss" scoped>
@import "@/styles/form-commons";
</style>
