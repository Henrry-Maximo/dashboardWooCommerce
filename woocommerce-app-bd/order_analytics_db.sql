-- Exclui o banco de dados se ele existir
DROP DATABASE order_analytics_db;
-- Cria um novo banco de dados
CREATE DATABASE order_analytics_db;

-- Seleciona o novo banco de dados criado
USE order_analytics_db;

-- Cria a tabela dashboard_users
CREATE TABLE dashboard_users (
   id INT(11) PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(45),
   password VARCHAR(30)
);

-- Cria a tabela dashboard_orders
create table dashboard_orders (
   id_order INT(11) PRIMARY KEY AUTO_INCREMENT,
   status VARCHAR(45) NOT NULL,
   date_created TIMESTAMP NOT NULL,
   active CHAR(1)
);

INSERT INTO dashboard_orders (ID_ORDER, STATUS, DATE_CREATED, ACTIVE)
VALUES ("2324", "nfe-emitida",  "2023-12-12 07:07:56", '1'),
       ("4000", "nfe-emitida", "2023-12-12 07:07:56", '1'),
       ("4001", "pedido_separacao", "2023-12-12 07:07:56", '1'),
       ("4002", "nfe-emitida",  "2023-12-12 07:07:56", '1'),
       ("4003", "transporte",  "2023-12-12 07:07:56", '1');

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

INSERT INTO dashboard_slas (NAME, STATUS, NUMBER_TIME, DEFINITION_TIME, DATA_CREATION)
VALUES ("4 Horas", "nfe-emitida", 4, "hour", "2023/08/24"),
       ("8 Horas", "retirada", 8, "hour", "2023/08/24"),
       ("16 Horas", "pedido_separacao", 16, "hour", "2023/08/24"),
       ("22 Horas", "transporte", 22, "hour", "2023/08/24");

CREATE TABLE dashboard_order_sla (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  order_id INT(11), -- pedido
  date_order TIMESTAMP NOT NULL,
  sla_id INT(11), -- sla
  sla_start INT(11),
  FOREIGN KEY (order_id) REFERENCES dashboard_orders(id_order),
  FOREIGN KEY (sla_id) REFERENCES dashboard_slas(id)
);
