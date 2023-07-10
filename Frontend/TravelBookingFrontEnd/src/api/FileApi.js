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
    const body = new FormData();
    for (let i = 0; i < files.length; i++) {
        body.append('images', files[i]);
    }
    return Api.post(`${url}/images`, body);
}

// export
const api = { uploadImage, upImages }
export default api;