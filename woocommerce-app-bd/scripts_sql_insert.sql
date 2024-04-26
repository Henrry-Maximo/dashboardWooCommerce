# Script Commands for Test

-- Consultas:

SELECT * FROM dashboard_users; # tabela de usuários 
SELECT * FROM dashboard_orders; # tabela de pedidos
SELECT * FROM dashboard_orders_line; # tabela de pedidos com dados específicos 
SELECT * FROM dashboard_orders_shipping; # tabela de pedidos associados à endereços
SELECT * FROM dashboard_slas; # tabela com definição do SLA
SELECT * FROM dashboard_order_sla; # tabela pedidos associados ao SLA 

-- Inserção:

# Inserção de Pedidos na tabela "dashboard_orders"
INSERT INTO dashboard_orders (ID_ORDER, ORDER_NUMBER, STATUS, PRINTED, DATE_CREATED, DATE_MODIFIED, ACTIVE)
VALUES (11692, "11693", "pedido_separacao", 0, "2024-04-24 15:11:23", "2024-04-24 15:11:23", 1);
       
INSERT INTO dashboard_users (name, password)
VALUES ("Edivanei", "@12345");

-- Atualização:

UPDATE dashboard_order_sla
SET sla_id = 2, sla_start = 8
WHERE order_id = 8009;

UPDATE dashboard_orders
SET date_created = "2024-01-25 10:54:28"
WHERE id_order = 8316;

UPDATE dashboard_orders
SET printed = 1
WHERE id_order = 10688;

-- Exclusão:

DELETE FROM dashboard_orders 
WHERE id_order = 7912;
    
DELETE FROM dashboard_order_sla 
WHERE id = 1;
    