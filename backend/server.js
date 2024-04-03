const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

const db = new sqlite3.Database('./groceryStore.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        address TEXT,
        contactNumber TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        description TEXT,
        quantity INTEGER DEFAULT 0,
        price REAL
    )`);
});

app.use(express.json());
app.use(cors());

// User Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password, email, address, contactNumber } = req.body;

        db.run(`INSERT INTO users (username, password, email, address, contactNumber) VALUES (?, ?, ?, ?, ?)`,
            [username, password, email, address, contactNumber],
            function (err) {
                if (err) {
                    return res.status(500).json({ message: 'Error registering user', error: err.message });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});




// User Login
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) => {
            if (err) {
                return res.status(500).json({ message: 'Error logging in', error: err.message });
            }

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Logged in successfully', userId: user.id });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get all products with quantity greater than zero
app.get('/api/products', (req, res) => {
    db.all(`SELECT * FROM products WHERE quantity > 0`, (err, products) => {
        if (err) {
            return res.status(500).json({ message: 'Error getting products', error: err.message });
        }
        res.status(200).json(products);
    });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { name, image, description, quantity, price } = req.body;

    db.run(`INSERT INTO products (name, image, description, quantity, price) VALUES (?, ?, ?, ?, ?)`,
        [name, image, description, quantity, price],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error adding product', error: err.message });
            }
            res.status(201).json({ message: 'Product added successfully' });
        });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, description, quantity, price } = req.body;

    db.run(`UPDATE products SET name = ?, image = ?, description = ?, quantity = ?, price = ? WHERE id = ?`,
        [name, image, description, quantity, price, id],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error updating product', error: err.message });
            }
            res.status(200).json({ message: 'Product updated successfully' });
        });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error deleting product', error: err.message });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
