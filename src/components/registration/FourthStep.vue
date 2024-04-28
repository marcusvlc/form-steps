<template>
  <form>
    <label class="text-field field">
      Endereço de e-mail
      <input
        class="text-input"
        type="email"
        v-model="formData.email"
        required
      />
    </label>

    <label class="text-field field">
      Nome
      <input class="text-input" type="email" v-model="formData.name" required />
    </label>

    <label class="text-field field" v-if="currentData.isCPF">
      CPF
      <input class="text-input" type="text" v-model="formData.cpf" required />
    </label>

    <label class="text-field field" v-else>
      CNPJ
      <input class="text-input" type="text" v-model="formData.cnpj" required />
    </label>

    <label v-if="currentData.isCPF" class="text-field field">
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

      <Button
        @onClick="onRegister"
        size="sm"
        text="Cadastrar"
        :busy="confirmBusy"
      />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import RegistrationStore from "../../store/RegistrationStore";
import Validator from "../../utils/Validator";
import Button from "../commons/Button.vue";
import RegistrationFieldsUtils from "../../utils/RegistrationFieldsUtils";
import RegistrationService from "../../services/RegistrationService";

const currentData = reactive({ ...RegistrationStore.registerData });

const confirmBusy = ref(false);

const formData = reactive({
  ...RegistrationStore.registerData,
});

const emit = defineEmits(["onRegisterSuccess", "onRegisterFail", "onBack"]);

const onRegister = () => {
  const diffFields = Validator.getFieldsWithDiffValue(
    currentData,
    formData,
    RegistrationFieldsUtils.getFieldsToCompare(currentData.isCPF)
  );

  if (diffFields.length) {
    const humanizedFieldsNames = diffFields.map(
      RegistrationFieldsUtils.getHumanizedFieldName
    );

    return alert(
      `Os seguintes campos foram preenchidos com valores diferentes aos preenchidos nos passos anteriores: ${humanizedFieldsNames.join(
        ", "
      )}`
    );
  }

  confirmBusy.value = true;
  RegistrationService.registerUser({ ...formData })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(await res.text());
      }

      emit("onRegisterSuccess");
    })
    .catch((err) => {
      emit("onRegisterFail", err.message);
    })
    .finally(() => {
      confirmBusy.value = false;
    });
};
</script>

<style lang="scss" scoped>
@import "@/styles/form-commons";
</style>
