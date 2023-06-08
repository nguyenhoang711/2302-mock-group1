import Api from './Api';

const url = "/groups";

const getAll = (page = 1, size = 10, sortField = 'id', sortType = 'desc', search = '', minTotalMember, maxTotalMember) => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // search
    if (search) {
        parameters.search = search;
    }

    // filter
    if (minTotalMember !== null && minTotalMember !== undefined) {
        parameters.minTotalMember = minTotalMember;
    }

    if (maxTotalMember !== null && maxTotalMember !== undefined) {
        parameters.maxTotalMember = maxTotalMember;
    }

    return Api.get(`${url}`, { params: parameters });
};

const existsByName = (name) => {
    return Api.get(`${url}/name/${name}`);
};

const create = (name) => {

    const body = {
        name
    }

    return Api.post(url, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const update = (id, name, totalMember) => {

    const body = {
        name,
        totalMember
    }

    return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
    return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = { getAll, existsByName, create, getById, update, deleteByIds }
export default api;