# Script Commands for Test

-- Consultas:

SELECT * FROM dashboard_users; # tabela de usuários 
SELECT * FROM dashboard_orders; # tabela de pedidos
SELECT * FROM dashboard_orders_line; # tabela de pedidos com dados específicos 
SELECT * FROM dashboard_orders_shipping; # tabela de pedidos associados à endereços
SELECT * FROM dashboard_slas; # tabela com definição do SLA
SELECT * FROM dashboard_order_sla; # tabela pedidos associados ao SLA 
SELECT * FROM dashboard_orders ORDER BY date_created ASC;
SELECT * FROM dashboard_orders WHERE active = 1 AND id_order NOT IN (10279, 10284);

-- Inserção:

# Inserção de Pedidos na tabela "dashboard_orders"
INSERT INTO dashboard_orders (ID_ORDER, ORDER_NUMBER, STATUS, PRINTED, DATE_CREATED, DATE_MODIFIED, ACTIVE)
VALUES (33335, "33335", "pedido_separacao", 0, "2024-04-24 15:11:23", "2024-04-24 15:11:23", 1);
       
INSERT INTO dashboard_users (name, password)
VALUES ("Edivanei", "@12345");

-- Atualização:

UPDATE dashboard_order_sla
SET sla_id = 2, sla_start = 8
WHERE order_id = 8009;

UPDATE dashboard_orders
SET status = "nfe-emitida"
WHERE id_order = 12279;

UPDATE dashboard_orders
SET printed = 1
WHERE id_order = 10872;

UPDATE dashboard_orders
SET active = 0
WHERE id_order = 11229;

-- Exclusão:

DELETE FROM dashboard_users
WHERE id = 5;
    
DELETE FROM dashboard_order_sla 
WHERE id = 1;
    