CREATE DATABASE mydb;
use mydb;
CREATE TABLE products (
id varchar(10) primary key,
name varchar(20),
email varchar(20) unique,
phone varchar(10)
);