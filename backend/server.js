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
        name TEXT UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        address TEXT,
        phoneNumber TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        category TEXT,
        quantity INTEGER DEFAULT 0,
        price REAL
    )`);

    db.run("CREATE TABLE IF NOT EXISTS orders  (orderid TEXT, customername ,contactnumber, product,date)",(err)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("order creted succeffffuly");
        }
    });


});

app.use(express.json());
app.use(cors());

// User Signup
app.get('/api/getorders',(req,res)=>{
    db.all("SELECT * FROM orders",(err,orders)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(orders);
        }
    })
})
app.post('/api/orderinsert',(req,res)=>{

    //
    const {name,orderid,phone,date,products} = req.body;
    products.shift();
    console.log(products);

    products.map((product)=>{
        db.run("INSERT INTO orders (orderid,contactnumber,customername,product,date) VALUES (?,?,?,?,?)",[orderid,phone,name,product.pname,date],(err)=>{
            if(err)
            {
                console.log("error in inserting orders ",err);
            }
            else
            {
                console.log("INSERTED ORDERS");
            }
        })
    });

})

db.all("SELECT * FROM orders",(err,order)=>{
    if(err)
    {
        console.log("DONT NOT EXIST");
    }
    else
    {
        console.log(order);
    }
})

app.post('/api/signup', async (req, res) => {
    console.log("Inerting");
    try {
        const { name, password, email, address, phoneNumber } = req.body;
        
        db.run(`INSERT INTO users (name, password, email, address, phoneNumber) VALUES (?, ?, ?, ?, ?)`,
            [name, password, email, address, phoneNumber],
            function (err) {
                if (err) {
                    console.log("Problem in inserton",err);
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
        await db.all("SELECT * FROM users WHERE name=? AND password = ?",[username,password],(err,user)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(user)
            {
                console.log(user);
                res.json({user,found:true});
            }
            else
            {
                console.log(user);
            res.json({found:false});
            }
        }
       })

        
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
