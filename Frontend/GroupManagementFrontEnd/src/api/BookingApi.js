import Api from './Api';

const url = "/bookings";

const getAll = (page = 1, size = 10, sortField = 'id', sortType = 'desc', search = '') => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search
    }

    // search
    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const existsById = (id) => {
    return Api.get(`${url}/id/${id}`);
};

const createBooking = (tripId, userId, numOfPeople, timeBooking,  totalPrice, details, amountPaid, bookingStatus) => {

    const body = {
        tripId: tripId,
        userId: userId,
        numOfPeople: numOfPeople,
        timeBooking: timeBooking,
        totalPrice: totalPrice,
        details: details,
        amountPaid: amountPaid,
        bookingStatus: bookingStatus
    }

    return Api.post(url, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const update = (id, tripId, userId, numOfPeople, totalPrice, details) => {

    const body = {
        tripId,
        userId,
        numOfPeople,
        totalPrice,
        details
    }

    return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
    return Api.delete(`${url}/${ids.toString()}`);
};

const updateStatus = (bookingId, bookingStatus, amountPaid) => {
    const body = {
        bookingStatus: bookingStatus,
        amountPaid: amountPaid
    }
    return Api.put(`${url}/updateStatus/${bookingId}`, body);
}

const pay = (bookingId, totalPrice) =>{
    const parameters = {
        bookingId: bookingId,
        totalPrice: totalPrice
    }
    return Api.get(`http://localhost:8080/api/v1/payment/create_payment`, { params: parameters });
}

// export
const api = { getAll, existsById, createBooking, getById, update, deleteByIds, updateStatus, pay }
export default api;