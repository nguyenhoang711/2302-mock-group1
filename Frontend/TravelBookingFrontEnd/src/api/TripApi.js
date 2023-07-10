import Api from './Api';

const url = "/trips";

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const api = {  getById }
export default api;