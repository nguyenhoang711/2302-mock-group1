import Api from './Api';
import FormData from 'form-data';

const url = "/files";

// trả về tên ảnh
const uploadImage = (imageFile) => {

    const body = new FormData();
    body.append('image', imageFile);

    return Api.post(`${url}/image`, body);
};

// up nhieu anh
const upImages = (files) => {
    return Api.post(`${url}/images`, files);
}

// export
const api = { uploadImage, upImages }
export default api;