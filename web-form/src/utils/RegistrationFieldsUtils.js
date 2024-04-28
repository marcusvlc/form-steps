class RegistrationFieldUtils {

    getFieldsToCompare(isCPF) {
        const dateField = isCPF ? 'birthDate' : 'openDate'
        const documentField = isCPF ? 'cpf' : 'cnpj'

        return ['name', 'email', dateField, documentField, 'phone', 'password']
    }

    getHumanizedFieldName(fieldKey) {
        const objKeyMapToName = {
            name: 'Nome',
            email: 'Endereço de e-mail',
            cpf: 'CPF',
            cnpj: 'CNPJ',
            birthDate: 'Data de nascimento',
            openDate: 'Data de abertura',
            phone: 'Telefone',
            password: 'Senha'
        }

        return objKeyMapToName[fieldKey]
    }
} 

export default new RegistrationFieldUtils()