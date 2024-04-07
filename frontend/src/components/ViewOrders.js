import React, { useState, useEffect } from "react";
import axios from 'axios';
import OrderSummaryReceipt from "./Receipt";

function ViewOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/getorders");
                console.log(resp.data);
                setOrders(resp.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {orders.map((ele) => (
                
                <div key={ele.orderid}>
                    <br/>
                    <h4>{ele.orderid}</h4>
                    <h4>{ele.product}</h4>
                    <h4>{ele.customername}</h4>
                    <h4>{ele.contactnumber}</h4>
                    <h4>{ele.date}</h4>
                    <br/>
                   
                </div>
            ))}
        </>
    );
}

export default ViewOrders;
