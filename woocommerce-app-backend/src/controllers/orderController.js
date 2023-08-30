const { getOrders, getUser, insertOrder, updateOrder } = require("../services/api");

const getOrderData = async (req, res) => {
  try {
    const orders = await getOrders();
    console.log("\nconsulta:\n", orders);
    res.json(orders);
  } catch (error) {
    console.error("Erro ao obter ordens:", error);
    res.status(500).json({ error: "Falha ao obter ordens." });
  }
  return;
};

const getUserData = async (req, res) => {
  try {
    const users = await getUser();
    console.log("\nconsulta:\n", users);
    res.json(users);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    res.status(500).json({ error: "Falha ao obter usuários." });
  }
  return;
};

const insertOrderData = async (req, res) => {
  try {
    const ordersData = await insertOrder();
    res.json({ message: "Dados inseridos com sucesso", data: ordersData });
  } catch (error) {
    console.error("Erro ao obter as informações para inserir no banco: ", error);
    res.status(500).json({ error: "Falha ao inserir informações." })
    throw error;
  }
}

const updateOrderData = async (req, res) => {
  try {
    const ordersData = await updateOrder();
    res.json({ message: "Dados atualizados com sucesso!", data: ordersData });
  } catch (error) {
    console.error("Erro ao obter as informações atualizadas para inserir no banco: ", error);
    res.status(500).json({ error: "Falha ao inserir atualizações." })
    throw error;
  }
}

module.exports = {
  getOrderData, getUserData, insertOrderData, updateOrderData
};