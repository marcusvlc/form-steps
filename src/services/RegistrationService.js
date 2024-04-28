class RegistrationService {
    registerUser(payload) {
        return fetch('http://localhost:3000/registration', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
    }
}

export default new RegistrationService()