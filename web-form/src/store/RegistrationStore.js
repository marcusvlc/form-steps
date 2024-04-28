import RegistrationFactory from "../utils/RegistrationFactory";

export default {
  registerData: RegistrationFactory.createRegistrationInitData(),

  updateRegisterData(values) {
    this.registerData = { ...this.registerData, ...values };
  },

  clearData() {
    this.registerData = RegistrationFactory.createRegistrationInitData();
  },
};
