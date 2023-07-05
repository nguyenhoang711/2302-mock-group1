import Api from './Api';

const url = "/bookingContacts";

const createBookingContact = (fullName, email, phoneNumber, address) => {
    const body = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        address: address
    }
    return Api.post(url, body);
}

const findByEmail = (email) => {
    return Api.get(`${url}/findByEmail/${email}`)
}

const existsByEmail = (email) => {
    return Api.get(`${url}/email/${email}`);
};

const updateBookingContact = (id, fullName, phoneNumber, address) => {
    const body = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address
    }
    return Api.put(`${url}/${id}`, body);
}

// export
const api = { createBookingContact, findByEmail, existsByEmail, updateBookingContact }
export default api;