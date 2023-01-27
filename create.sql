drop table ecommerce.producut;
drop table ecommerce.coupon;
drop schema ecommerce;

create schema ecommerce;

create table ecommerce.producut (
    id_product integer primary key,
    price numeric,
    description text
);

insert into ecommerce.producut (id_product, price, description) VALUES (1, 10, 'A');
insert into ecommerce.producut (id_product, price, description) VALUES (2, 10, 'B');
insert into ecommerce.producut (id_product, price, description) VALUES (3, 10, 'C');

create table ecommerce.coupon (
    code text primary key,
    percentage numeric
);

insert into ecommerce.coupon (code, percentage) VALUES ('VALE20', 20);