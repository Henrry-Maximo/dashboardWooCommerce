# SELECTS 
#SELECT * FROM dashboard_users;
SELECT 
    *
FROM
    dashboard_orders;
#SELECT * FROM dashboard_orders_line;
#SELECT * FROM dashboard_orders_shipping;
SELECT * FROM dashboard_slas;
SELECT * FROM dashboard_order_sla;


SELECT * FROM dashboard_orders WHERE active = 1;

# INSERTS
INSERT INTO dashboard_users (name, password)
VALUES ("Henrique", "@123");

SELECT * FROM dashboard_order_sla WHERE order_id = 8009;

# UPDATES
UPDATE dashboard_order_sla
SET sla_id = 2, sla_start = 8
WHERE order_id = 8009;

UPDATE dashboard_orders
SET date_created = 'nfe-emitida'
WHERE id_order = 8009;


UPDATE dashboard_orders 
SET 
    status = '1'
WHERE
    id_order = 7558;

UPDATE dashboard_order_sla 
SET 
    sla_start = '2'
WHERE
    id = 1;


UPDATE dashboard_orders
SET date_created = "2023-12-13 10:54:28"
WHERE id_order = 8009;

UPDATE dashboard_orders
SET active = 0
WHERE id_order = 7584;

DELETE FROM dashboard_orders 
WHERE
    id_order = 7912;
    
DELETE FROM dashboard_order_sla 
WHERE
    id = 1;
    
SELECT 
    *
FROM
    dashboard_orders
WHERE
    active = 1
ORDER BY date_created ASC
LIMIT 12;

       
       