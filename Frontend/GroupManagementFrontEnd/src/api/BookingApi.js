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

// export
const api = { getAll, existsById, create, getById, update, deleteByIds }
export default api;