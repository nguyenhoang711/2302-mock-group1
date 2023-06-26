import Api from './Api';

const url = "/contacts";

const getAll = (page = 1, size = 10, sortField = 'id', sortType = 'desc') => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    return Api.get(`${url}`, { params: parameters });
};

// const existsByEmail = (email) => {
//     return Api.get(`${url}/email/${email}`);
// };

const create = (email, message, evidence) => {

    const body = {
        email, message, evidence
    }

    return Api.post(url, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const update = (id, email, message, evidence) => {

    const body = {
        email,
        message,
        evidence
    }

    return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
    return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = { getAll, getById, create, update, deleteByIds }
export default api;