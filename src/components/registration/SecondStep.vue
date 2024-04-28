<template>
  <form class="second-step-form">
    <label class="text-field field">
      Nome
      <input class="text-input" type="email" v-model="formData.name" required />
    </label>

    <label class="text-field field" v-if="formData.isCPF">
      CPF
      <input class="text-input" type="text" v-model="formData.cpf" required />
    </label>

    <label class="text-field field" v-else>
      CNPJ
      <input class="text-input" type="text" v-model="formData.cnpj" required />
    </label>

    <label v-if="formData.isCPF" class="text-field field">
      Data de nascimento
      <input
        class="date-input"
        type="date"
        v-model="formData.birthDate"
        required
      />
    </label>

    <label v-else class="text-field field">
      Data de abertura
      <input
        class="date-input"
        type="date"
        v-model="formData.openDate"
        required
      />
    </label>

    <label class="text-field field">
      Telefone
      <input
        class="text-input"
        type="text"
        v-model="formData.phone"
        placeholder="(99) 9999-9999"
        required
      />
    </label>

    <div class="button-container">
      <Button @onClick="emit('onBack')" variant="secondary" text="Voltar" />
      <Button @onClick="onContinue" />
    </div>
  </form>
</template>

<script setup>
import Button from "../commons/Button.vue";
import RegistrationStore from "../../store/RegistrationStore";
import { reactive } from "vue";
import Validator from "../../utils/Validator";

const formData = reactive({ ...RegistrationStore.registerData });

const emit = defineEmits(["onBack", "onContinue"]);

const onContinue = () => {
  if (formData.isCPF && !Validator.isValidDate(formData.birthDate)) {
    return alert("Necessário preencher uma data de nascimento válida");
  }

  if (!formData.isCPF && !Validator.isValidDate(formData.openDate)) {
    return alert("Necessário preencher uma data de abertura válida");
  }

  if (!formData.name) {
    return alert("Necessário preencher um nome");
  }

  if (formData.isCPF && !Validator.isValidCPF(formData.cpf)) {
    return alert("Necessário preencher um CPF válido");
  }

  if (!formData.isCPF && !Validator.isValidCNPJ(formData.cnpj)) {
    return alert("Necessário preencher um CNPJ válido");
  }

  if (!Validator.isValidPhoneNumber(formData.phone)) {
    return alert("Necessário preencher um telefone válido");
  }

  emit("onContinue", { ...formData });
};
</script>

<style lang="scss" scoped>
@import "@/styles/form-commons";

.second-step-form {
  display: flex;
  flex-direction: column;
}
</style>
