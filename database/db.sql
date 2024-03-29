CREATE DATABASE personalfinancedb

CREATE TABLE expense(
    id SERIAL PRIMARY KEY,
    concept VARCHAR(255),
    category_id INT NOT NULL,
    amount NUMERIC(18,2),
    expensedate DATE,
    expensetype NUMERIC(1),
    usermail VARCHAR(255),
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(id)
)

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name TEXT
)