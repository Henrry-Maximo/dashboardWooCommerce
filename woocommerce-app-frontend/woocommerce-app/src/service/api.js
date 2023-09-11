import axios from "axios";

const API_BASE_URL = "http://192.168.0.100:5000";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
