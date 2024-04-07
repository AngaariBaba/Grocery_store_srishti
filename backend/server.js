const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const Razorpay = require('razorpay');
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
        category TEXT,
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
   
        const { username, password } = req.body;

        if(username=="naman" && password=="1234")
        {
            res.json({ok:"yes"});
        }
        else
        {
            res.json({ok:"no"});
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
    const { productName, image, category, quantity, price } = req.body;
    console.log(req.body);
    db.run(`INSERT INTO products (name, image, category, quantity, price) VALUES (?, ?, ?, ?, ?)`,
        [productName, image, category, quantity, price],
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


db.run('DELETE FROM PRODUCTS WHERE name like ?',['%ilk%'],(err)=>{
    if(err)
    {
        console.log("error agya bhai");
    }
    else
    {
        console.log("deleted");
    }
});



//RAZORPAY

const razorpay = new Razorpay({
    key_id: 'rzp_test_A51z9AKTI3SXov',  // Replace with your Test API Key
    key_secret: 'wxYZ3SgDzvmWhMcYLdD5vox2'  // Replace with your Test API Secret
});

app.post('/api/create-order', async (req, res) => {
    const { amount, currency } = req.body;

    console.log("AMOUNR = ",amount);
    console.log("CURRENCY = ",currency);
    const options = {
        amount: amount,
        currency: currency,
        receipt: 'receipt_order_74394',
        payment_capture: 1
    };

    try {
        const response = await razorpay.orders.create(options, function(err, order) {
            if(err)
            {
                console.log(err);
            }
            else
            {
               res.json(order);
            }
          });
          console.log(response);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/verify-payment', async (req, res) => {
    const { paymentId } = req.body;

    try {
        const payment = await razorpay.payments.fetch(paymentId);
        
        if (payment.status === 'captured') {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.log("error hai ----->>>",error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
