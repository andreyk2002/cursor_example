-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Create an index on order_date for better performance
CREATE INDEX idx_orders_date ON orders(order_date);

-- 1. Calculate total sales volume for March 2024
SELECT SUM(amount) as total_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Calculate average order value for the last three months
SELECT AVG(amount) as avg_order_value
FROM orders
WHERE order_date >= date('now', '-3 months')
  AND order_date <= date('now'); 