-- Exclui o banco de dados se ele existir
DROP DATABASE order_analytics_db;
-- Cria um novo banco de dados
CREATE DATABASE order_analytics_db;

-- Seleciona o novo banco de dados criado
USE order_analytics_db;

#select * from dashboard_users;
#select * from dashboard_orders;
#select * from dashboard_slas;

-- Cria a tabela dashboard_users
CREATE TABLE dashboard_users (
   id INT(11) PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(45),
   password VARCHAR(30)
);

-- Cria a tabela dashboard_orders
create table dashboard_orders (
   id_order INT(11) PRIMARY KEY AUTO_INCREMENT,
   status VARCHAR(45),
   date_created DATE
);

-- Cria a tabela dashboard_orders_products
create table dashboard_orders_products (
   id INT(11) PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(45),
   quantity INT(11),
   sku INT(13),
   name_client VARCHAR(45),
   data_creation DATE,
   address VARCHAR(255)
);

-- Cria a tabela dashboard_slas
create table dashboard_slas (
   id INT(11) PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(45),
   status VARCHAR(45),
   number_time INT(11),
   definition_time VARCHAR(45),
   data_creation TIMESTAMP
);