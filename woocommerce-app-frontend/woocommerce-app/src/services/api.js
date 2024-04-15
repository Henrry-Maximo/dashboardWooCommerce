import axios from "axios";

const baseURL = "http://10.10.2.16:8080/mov-painel";

export const api = axios.create({ baseURL });

export function configureAxios(token) {
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const fetchOrders = async () => {
  try {
    const token = sessionStorage.getItem("jwt");
    const apiToken = configureAxios(token);
    const response = await apiToken.get("/orders");
    return response.data;
  } catch (err) {
    console.error("Erro ao acessar a API de dados (orders)", err);
    throw err;
  }
};

export const fetchOrderSla = async () => {
  try {
    const token = sessionStorage.getItem("jwt");
    const apiToken = configureAxios(token);
    const response = await apiToken.get("/order-data-sla");
    return response.data;
  } catch (err) {
    console.error("Erro ao acessar a API de dados (sla)", err);
    throw err;
  }
};
