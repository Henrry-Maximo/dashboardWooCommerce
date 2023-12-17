import axios from "axios";

const API_BASE_URL = "http://192.168.0.100:5000/mov-painel";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderSla = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order-data-sla`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
