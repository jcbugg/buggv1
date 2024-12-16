import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchItems = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query },
  });
  return response.data;
};

export const fetchItemDetails = async (id) => {
  const response = await axios.get(`${API_URL}/items/${id}`);
  return response.data;
};
