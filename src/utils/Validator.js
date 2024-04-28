class Validator {
    isValidEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email)
    }

    isValidCPF(cpf) {
        const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/
        return cpfRegex.test(cpf)
    }

    isValidCNPJ(cnpj) {
        const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/\d{4}\-?\d{2}$/

        return cnpjRegex.test(cnpj)
    }

    isValidPhoneNumber(phone) {
        const phoneRegex = /\(?([0-9]{2,3}|0{1}((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}/
        return phoneRegex.test(phone)
    }

    isValidDate(dateStr) {
        if(!dateStr) return false

        const dtToday = new Date()

        return new Date(dateStr) < dtToday;
    }

    isValidPassword(password) {
        return !!password
    }

    getFieldsWithDiffValue(obj, objToCompare, keysList) {
        return keysList.filter(key => obj[key] !== objToCompare[key])
    }
}

export default new Validator()