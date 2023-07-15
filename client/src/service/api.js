import {publicRequest} from '../utils/makeRequest';

export const createFile = async (data) => {
    try {
        const response = await publicRequest.post(`/files/upload`, data);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const fetchAllFile = async () => {
    try {
        const response = await publicRequest.get(`/files/all`);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}

export const deleteFile = async (id) => {
    try {
        const response = await publicRequest.delete(`/files/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling the API ', error.message);
    }
}