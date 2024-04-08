import React, { useState, useEffect } from "react";
import axios from 'axios';
import './orders.css';  // Import the CSS file

function ViewOrders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/getorders");
                setOrders(resp.data);
                setFilteredOrders(resp.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const filtered = orders.filter(order => 
            order.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.date.includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(filtered);
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Orders List</h1>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search by customer name or date"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>

            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Customer Name</th>
                        <th>Contact Number</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((ele, index) => (
                        <tr key={index}>
                            <td>{ele.orderid}</td>
                            <td>{ele.product}</td>
                            <td>{ele.customername}</td>
                            <td>{ele.contactnumber}</td>
                            <td>{ele.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewOrders;
