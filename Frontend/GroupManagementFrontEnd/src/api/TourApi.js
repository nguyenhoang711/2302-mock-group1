import Api from './Api';

const url = "/tours";

const getAll = (page = 1, size = 10, sortField = 'id', sortType = 'desc', search = '', minPrice, maxPrice) => {

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // search: startDest,type, saleRate
    if (search) {
        parameters.search = search;
    }

    // filter: price, duration, numOfPeople
    if (minPrice !== null && minPrice !== undefined) {
        parameters.minPrice = minPrice;
    }

    if (maxPrice !== null && maxPrice !== undefined) {
        parameters.maxPrice = maxPrice;
    }

    // if (minDays !== null && minDays !== undefined) {
    //     parameters.minDays = minDays;
    // }

    // if (maxDays !== null && maxDays !== undefined) {
    //     parameters.maxDays = maxDays;
    // }

    return Api.get(`${url}`, { params: parameters });
};

// const existsByName = (name) => {
//     return Api.get(`${url}/name/${name}`);
// };

const create = (name, price, 
    duration, numOfPeople, type, 
    startDest,saleRate, details) => {
    const body = {
        name,price,
        duration, numOfPeople, type,
        startDest, saleRate, details
    }

    return Api.post(url, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const update = (id, name, 
    price, duration, 
    startDest,type,
    numOfPeople, details,
    saleRate
    ) => {

    const body = {
        name,
        price,
        duration,
        startDest,
        type,
        numOfPeople,
        details,
        saleRate
    }

    return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
    return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = { getAll, 
    // existsByName, 
    create, getById, update, deleteByIds }
export default api;