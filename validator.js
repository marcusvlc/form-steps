module.exports = {
  getErrorOnFields({
    email,
    password,
    name,
    isCPF,
    cpf,
    cnpj,
    phone,
    birthDate,
    openDate,
  }) {
    const errorOnCommonFields = !!email && !!password && !!phone && !!name;

    const errorOnPersonFields = isCPF && !!cpf && !!birthDate;

    const errorOnCompanyFields = !isCPF && !!cnpj && !!openDate;

    if (errorOnCommonFields && errorOnPersonFields && errorOnCompanyFields)
      return 400;

    return null;
  },
};
