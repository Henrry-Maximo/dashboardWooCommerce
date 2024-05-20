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
   password VARCHAR(90)
);

-- Cria a tabela dashboard_orders
create table dashboard_orders (
   id_order INT PRIMARY KEY AUTO_INCREMENT,
   order_number VARCHAR(20) NOT NULL,
   status VARCHAR(45) NOT NULL,
   printed BOOLEAN NOT NULL,
   date_created DATETIME NOT NULL,
   date_modified DATETIME NOT NULL,
   active BOOLEAN NOT NULL
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
  date_order TIMESTAMP NOT NULL,
  sla_id INT(11), -- sla
  sla_start INT(11),
  FOREIGN KEY (order_id) REFERENCES dashboard_orders(id_order),
  FOREIGN KEY (sla_id) REFERENCES dashboard_slas(id)
);

INSERT INTO dashboard_users (name, password)
VALUES ("Admin", "$2b$14$I2h.s9h0ArJvM6hF/DYaquTkoII4.eL7mXRVnEtqZuYS4vs7/1ZZi");

INSERT INTO dashboard_slas (NAME, STATUS, NUMBER_TIME, DEFINITION_TIME, DATA_CREATION)
VALUES ("8 Horas", "nfe-emitida", 8, "hour", "2023/08/24"),
       ("8 Horas", "retirada", 8, "hour", "2023/08/24"),
       ("8 Horas", "pedido_separacao", 8, "hour", "2023/08/24"),
       ("8 Horas", "transporte", 8, "hour", "2023/08/24");