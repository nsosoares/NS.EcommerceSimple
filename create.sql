create schema ecommerce;

create table ecommerce.product (
    id_product integer primary key,
    price numeric,
    description text,
    width integer,
    height integer,
    length integer,
    weigth integer,
    currency text
);

insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (1, 10, 'A', 100, 30, 10, 3, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (2, 10, 'B', 50, 50, 50, 22, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (3, 10, 'C', 10, 10, 10, 0.9, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (4, 10, 'D', 10, 0, 10, 0.9, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (5, 10, 'E', 10, 10, 10, 0, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (6, 10, 'F', 10, 6, 4, 0.9, 'BRL');
insert into ecommerce.product (id_product, price, description, width, height, length, weigth, currency) VALUES (7, 10, 'G', 10, 6, 4, 0.9, 'USD');


create table ecommerce.coupon (
    code text primary key,
    percentage numeric,
    expire_date date
);

insert into ecommerce.coupon (code, percentage, expire_date) VALUES ('VALE20', 20, '2023-03-15');
insert into ecommerce.coupon (code, percentage, expire_date) VALUES ('VALE10', 20, '2023-01-01');

create table ecommerce.order (
    id_order serial primary key,
    coupon_code text,
    coupon_percentage numeric,
    code text,
    cpf text,
    email text,
    issue_date timestamp,
    freight numeric,
    total numeric,
    sequence integer
);

create table ecommerce.item (
    id_order integer references ecommerce.order (id_order),
    id_product integer references ecommerce.product (id_product),
    price numeric,
    quantity numeric,
    primary key (id_order, id_product)
);