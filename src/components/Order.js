import React, { useState,useEffect } from 'react';

const GameOrderList = () => {
    const [OrderList,setOrderList] = useState([]);
    useEffect(() => {
        fetch('/getOrderList/2')
            .then(response => response.json())
            .then(data => setOrderList(data))
    }, []);

    const handleDeleteOrder = oid => {
        fetch('/delete_order/' + oid.toString())
            .then((response) => response.json())
            .then((data) => {
                const updatedOrderList = OrderList.filter(order => order.oid !== oid);
                setOrderList(updatedOrderList);
            })
            .catch((error) => console.log("error"));
    }


    return (
        <div className="game-order-list">
            <h1>My Orders</h1>
            <table>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Game ID</th>
                    <th>Game Name</th>
                    <th>Money</th>
                    <th>Transaction Time</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {OrderList.map(order => (
                    <tr key={order.oid}>
                        <td>{order.oid}</td>
                        <td>{order.o_gid}</td>
                        <td>{order.g_name}</td>
                        <td>{order.o_value}</td>
                        <td>{order.o_time}</td>
                        <td>Delete</td>
                        <td>
                            <button type="link" onClick={() => handleDeleteOrder(order.oid)} className="link-button">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameOrderList;
