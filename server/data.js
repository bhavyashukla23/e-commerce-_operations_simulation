require('dotenv').config();
const pool = require('./config/db');

// Sample product data
const products = [
    { name: 'Laptop', description: 'A high-performance laptop', price: 1200.50, stock: 15 },
    { name: 'Smartphone', description: 'A latest-gen smartphone', price: 899.99, stock: 25 },
    { name: 'Wireless Earbuds', description: 'Noise-cancelling wireless earbuds', price: 199.99, stock: 100 },
    { name: 'Gaming Monitor', description: '4K Ultra HD gaming monitor', price: 499.99, stock: 30 },
    { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 150.00, stock: 50 }
];

// Function to insert sample data into the products table
const insertProductData = async () => {
    try {
        console.log('Starting data insertion...');
        for (const product of products) {
            await pool.query(
                'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
                [product.name, product.description, product.price, product.stock]
            );
        }

        console.log('Sample product data inserted successfully!');
    } catch (error) {
        console.error('Error inserting product data:', error.message);
    } finally {
        pool.end();  
    }
};

// Running the function to insert data
insertProductData();
