<template>
  <form class="first-step-form">
    <label class="text-field field">
      Endereço de e-mail
      <input
        class="text-input"
        type="email"
        v-model="formData.email"
        required
      />
    </label>

    <div class="radio-field field">
      <label>
        <input type="radio" id="cpf" :value="true" v-model="formData.isCPF" />
        Pessoa física
      </label>

      <label>
        <input type="radio" id="cnpj" :value="false" v-model="formData.isCPF" />
        Pessoa jurídica
      </label>
    </div>

    <Button @onClick="onContinue" size="md" />
  </form>
</template>

<script setup>
import { reactive } from "vue";
import Button from "../commons/Button.vue";
import Validator from "../../utils/Validator";
import RegistrationStore from "../../store/RegistrationStore";

const formData = reactive({ ...RegistrationStore.registerData });

const emit = defineEmits(["onContinue"]);

const onContinue = () => {
  if (!Validator.isValidEmail(formData.email)) {
    return alert("Email inválido");
  }

  emit("onContinue", {
    isCPF: formData.isCPF,
    email: formData.email,
  });
};
</script>

<style lang="scss" scoped>
@import "@/styles/form-commons";

.first-step-form {
  display: flex;
  flex-direction: column;
}
</style>
