import React, { useState,useEffect } from 'react';
import {useSelector} from "react-redux";

const GameOrderList = () => {
    const [OrderList,setOrderList] = useState([]);
    const user_id = useSelector(state => state.user.id);
    useEffect(() => {
        fetch('/getOrderList/' + user_id.toString())
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
                    <th></th>
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
                        <td>
                            <img src={require("../game_images/"+order.o_gid.toString()+"/game_3.jpg")} style={{ height: '40px', width: '80px' }} />
                        </td>
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
