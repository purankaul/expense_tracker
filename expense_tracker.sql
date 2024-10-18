CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(255),
  amount DECIMAL(10, 2)
);
