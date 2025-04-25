# SQL Sales Analysis Queries

This project contains SQL queries for analyzing sales data from an orders table. The queries are written for SQLite and can be adapted for other SQL databases with minimal modifications.

## Database Schema

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);
```

## Queries

### 1. Monthly Sales Volume
Calculates the total sales volume for a specific month (March 2024 in this example).

```sql
SELECT SUM(amount) as total_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';
```

### 2. Top Customer Analysis
Identifies the customer who has spent the most across all orders.

```sql
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
```

### 3. Recent Average Order Value
Calculates the average order value for the last three months from the current date.

```sql
SELECT AVG(amount) as avg_order_value
FROM orders
WHERE order_date >= date('now', '-3 months')
  AND order_date <= date('now');
```

## Usage Notes

- All queries use standard SQLite date functions
- The queries assume the `order_date` column is in a valid date format
- NULL values are automatically excluded from calculations
- For optimal performance, consider adding an index on the `order_date` column:
  ```sql
  CREATE INDEX idx_orders_date ON orders(order_date);
  ```

## Database Compatibility

While these queries are written for SQLite, they can be adapted for other SQL databases:

- **PostgreSQL**: Replace `strftime()` with `to_char()`
- **MySQL**: Replace `strftime()` with `DATE_FORMAT()`
- **SQL Server**: Replace `strftime()` with `FORMAT()`

## Example Results

1. Monthly Sales Volume:
   ```
   total_sales
   -----------
   15000.00
   ```

2. Top Customer:
   ```
   customer    total_spent
   --------   -----------
   John Doe    5000.00
   ```

3. Average Order Value:
   ```
   avg_order_value
   --------------
   250.00
   ``` 