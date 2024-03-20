# SELECT

SELECT * FROM dashboard_users;
SELECT * FROM dashboard_orders;
#SELECT * FROM dashboard_orders_line;
#SELECT * FROM dashboard_orders_shipping;
SELECT * FROM dashboard_slas;
SELECT * FROM dashboard_order_sla;
SELECT * FROM dashboard_orders WHERE active = 1;
SELECT * FROM dashboard_order_sla WHERE order_id = 8009;

SELECT * FROM dashboard_orders
WHERE active = 1
ORDER BY date_created ASC
LIMIT 12;

# INSERT
INSERT INTO dashboard_users (name, password)
VALUES ("Henrique", "@123");

# UPDATE
UPDATE dashboard_order_sla
SET sla_id = 2, sla_start = 8
WHERE order_id = 8009;

UPDATE dashboard_orders
SET date_created = 'nfe-emitida'
WHERE id_order = 8009;

UPDATE dashboard_orders 
SET status = '1'
WHERE id_order = 8316;

UPDATE dashboard_order_sla 
SET sla_start = '2'
WHERE id = 1;

UPDATE dashboard_orders
SET date_created = "2024-01-25 10:54:28"
WHERE id_order = 8316;

UPDATE dashboard_orders
SET active = 0
WHERE id_order = 7584;

# DELETE

DELETE FROM dashboard_orders 
WHERE id_order = 7912;
    
DELETE FROM dashboard_order_sla 
WHERE id = 1;
    


       
       