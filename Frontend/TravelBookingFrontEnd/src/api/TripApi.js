import Api from './Api';

const url = "/trips";


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

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const existsById = (id) => {
    return Api.get(`${url}/id/${id}`);
};



const api = { getById, getAll, existsById }
export default api;