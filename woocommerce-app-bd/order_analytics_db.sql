-- Exclui o banco de dados se ele existir
DROP DATABASE order_analytics_db;
-- Cria um novo banco de dados
CREATE DATABASE order_analytics_db;

-- Seleciona o novo banco de dados criado
USE order_analytics_db;

#select * from dashboard_users;

select * from dashboard_orders;
select * from dashboard_orders_line;
select * from dashboard_orders_shipping;
select * from dashboard_slas;
select * from dashboard_order_sla;


#SELECT id, secret, type FROM dashboard_users WHERE name = "Henrique";
#UPDATE dashboard_users SET type = "1" WHERE id = 6;

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

-- Cria a tabela dashboard_orders_line
create table dashboard_orders_line (
   id INT(11) PRIMARY KEY,
   id_order INT(11),
   name VARCHAR(45),
   quantity INT(11),
   sku INT(13),
   FOREIGN KEY (id_order) REFERENCES dashboard_orders(id_order)
);

-- Cria a tabela dashboard_orders_shipping
create table dashboard_orders_shipping (
   id INT(11) PRIMARY KEY AUTO_INCREMENT,
   id_order INT(11),
   first_name VARCHAR(45),
   last_name VARCHAR(45),
   company VARCHAR(45),
   address VARCHAR(255),
   city VARCHAR(45),
   state VARCHAR(45),
   postcode VARCHAR(20),
   country VARCHAR(20),
   phone INT(16),
   number INT(11),
   FOREIGN KEY (id_order) REFERENCES dashboard_orders(id_order)
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

CREATE TABLE dashboard_order_sla (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  order_id INT(11), -- pedido
  sla_id INT(11), -- sla
  start_timestamp TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES dashboard_orders(id_order),
  FOREIGN KEY (sla_id) REFERENCES dashboard_slas(id)
);
