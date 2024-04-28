<template>
  <div class="registration-container">
    <StepView :current-step="humanizedCurrentStep" :steps-qty="stepsQty" />
    <span class="registration-container__title">{{ currentTitle }}</span>
    <component
      @onContinue="onContinue"
      @onBack="onBack"
      :is="currentComponent"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import FirstStepVue from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import RegistrationStore from "../../store/RegistrationStore";
import StepView from "../commons/StepView.vue";

const formSteps = [
  {
    title: () => "Seja bem vindo(a)",
    component: () => FirstStepVue,
  },
  {
    title: (isCPF) => (isCPF ? "Pessoa física" : "Pessoa jurídica"),
    component: () => SecondStep,
  },
];

const currentStep = ref(0);
const stepsQty = ref(formSteps.length);

const currentComponent = computed(() =>
  formSteps[currentStep.value].component()
);
const currentTitle = computed(() =>
  formSteps[currentStep.value].title(RegistrationStore.registerData.isCPF)
);
const humanizedCurrentStep = computed(() => currentStep.value + 1);

const goToNextStep = () => {
  currentStep.value = Math.min(currentStep.value + 1, formSteps.length - 1);
};

const goToPreviousStep = () => {
  currentStep.value = Math.max(currentStep.value - 1, 0);
};

const onContinue = (values, stepFrom) => {
  RegistrationStore.updateRegisterData(values);

  goToNextStep();
};

const onBack = () => {
  goToPreviousStep();
};
</script>

<style lang="scss" scoped>
.registration-container {
  display: flex;
  flex-direction: column;
  height: 700px;
  width: 350px;

  &__title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 35px;
    margin-top: 8px;
  }
}
</style>
