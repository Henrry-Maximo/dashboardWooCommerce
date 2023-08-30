# INSERT:
INSERT INTO dashboard_users (name, password)
VALUES ("Edivanei", "@1234");

INSERT INTO dashboard_slas (NAME, STATUS, NUMBER_TIME, DEFINITION_TIME, DATA_CREATION)
VALUES ("4 Horas", "nfe-emitida", 4, "hour", "2023/08/24"),
       ("4 Horas", "retirada", 4, "hour", "2023/08/24"),
       ("4 Horas", "pedido_separacao", 4, "hour", "2023/08/24"),
       ("4 Horas", "transporte", 4, "hour", "2023/08/24");
       
INSERT INTO dashboard_orders (STATUS, DATE_CREATED)
VALUES ("nfe-emitida",  "2023/08/24");

# UPDATE:
UPDATE dashboard_orders
SET status = 'retirada'
WHERE id_order = 4386;

       
       