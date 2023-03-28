create schema ecommerce;

create table ecommerce.product (
    id_product integer primary key,
	description text,
	price numeric,
	width integer,
	height integer,
	length integer,
	weight numeric,
	currency text
);

insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (2, 'B', 5000, 50, 50, 50, 22, 'BRL');
insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (1, 'A', 1000, 100, 30, 10, 3, 'BRL');
insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (3, 'C', 30, 10, 10, 10, 0.9, 'BRL');
insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (4, 'D', 100, 100, 30, 10, 3, 'USD');
insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (5, 'E', 100, 100, 30, 10, -3, 'USD');
insert into ecommerce.product (id_product, description, price, width, height, length, weight, currency) VALUES (6, 'F', 100, 100, -30, 10, 3, 'USD');

create table ecommerce.coupon (
    code text primary key,
    percentage numeric,
    expire_date date
);

insert into ecommerce.coupon (code, percentage, expire_date) VALUES ('VALE20', 20, '2060-09-15');
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