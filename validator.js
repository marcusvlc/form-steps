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
    const errorOnCommonFields = !(!!email && !!password && !!phone && !!name);

    const errorOnPersonFields = isCPF ? !(!!cpf && !!birthDate) : false;

    const errorOnCompanyFields = !isCPF ? !(!!cnpj && !!openDate) : false;

    if (errorOnCommonFields || errorOnPersonFields || errorOnCompanyFields)
      return 400;

    return null;
  },
};
