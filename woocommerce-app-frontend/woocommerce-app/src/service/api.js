import axios from "axios";

const API_BASE_URL = "http://10.10.2.16:8080/mov-painel";

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error("Sem acesso à API de dados (orders)");
  }
};

export const fetchOrderSla = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order-data-sla`);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    alert("Sem acesso à API de dados (sla).");
  };
};
