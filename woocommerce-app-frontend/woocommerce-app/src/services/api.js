import axios from "axios";

const api = axios.create({
  baseURL: "http://10.10.2.16:8080/mov-painel",
});
const API_BASE_URL = "http://10.10.2.16:8080/mov-painel";
const token = sessionStorage.getItem("jwt");

export const fetchOrders = async () => {
  try {
    let response = await axios.get(`${API_BASE_URL}/orders`, { headers: {
      Authorization: `Bearer ${token}`
    }});

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.error("Sem acesso à API de dados (orders)", err.message);
  }
};

export const fetchOrderSla = async () => {
  
  try {
    let response = await axios.get(`${API_BASE_URL}/order-data-sla`, { headers: {
      Authorization: `Bearer ${token}`
    }});

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    alert("Sem acesso à API de dados (sla).");
  }
};

export default api;
