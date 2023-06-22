import Api from './Api';

const url = "/bookings";

const getAll = () => {
    return Api.get(`${url}`);
};

const existsById = (id) => {
    return Api.get(`${url}/id/${id}`);
};

const create = (tripId, userId, numOfPeople, totalPrice, details) => {

    const body = {
        tripId,
        userId,
        numOfPeople,
        totalPrice,
        details
    }

    return Api.post(url, body);
};

// export
const api = { getAll, existsById, create}
export default api;