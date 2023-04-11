import React, { useState, useEffect } from 'react';


const CartList = () => {
    const [CartList, setCartList] = useState([]);
    const [CurrentPrice, setCurrentPrice] = useState(99.99);
    const [Prices,setPrices] = useState([]);
    const [currentg_id, setcurrentg_id] = useState(1);
    useEffect(() => {
        fetch('/getCartList/2')
            .then(response => response.json())
            .then(data => setCartList(data))
        fetch('/getPrices')
            .then(response => response.json())
            .then(data => setPrices(data))
    }, []);

    const getPrice = cart_gid => {
        fetch('/getGamePrice/cart_gid')
            .then(response => response.json())
            .then(data => setCurrentPrice(data))
    }
    const handlePurchase = cart_gid => {
        getPrice(cart_gid);
        fetch('/cart_purchase',{
        method: 'POST',
            headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ o_uid:2,o_gid:cart_gid,o_value: Prices[cart_gid]["g_price"] })
    })
            .then((response) => response.json())
            .then((data) => {
                const updatedCartList = CartList.filter(cart => cart.cart_gid !== cart_gid);
                setCartList(updatedCartList);
            })
            .catch((error) => console.log("error"));
    }

    const handleDeleteCart = cart_gid => {
        fetch('/delete_cart/2/'+cart_gid.toString())
            .then((response) => response.json())
            .then((data) => {
                const updatedCartList = CartList.filter(cart => cart.cart_gid !== cart_gid);
                setCartList(updatedCartList);
            })
            .catch((error) => console.log("error"));
    }

    return (
        <div className="cart-list" style={{ overflowY: 'scroll', height: 'auto' }}>
            <h1>My Cart</h1>
            <table>
                <thead>
                <tr>
                    <th>Game ID</th>
                    <th>Game Name</th>
                    <th>Money</th>
                    <th>Game Tag</th>
                    <th>Delete</th>
                    <th>Purchase</th>
                </tr>
                </thead>
                <tbody>
                {CartList.map(cart => (
                    <tr key={cart.cart_gid}>
                        <td>{cart.g_id}</td>
                        <td>{cart.g_name}</td>
                        <td>{cart.g_price}</td>
                        <td>{cart.g_tag}</td>
                        <td>
                            <button type="link" onClick={() => handleDeleteCart(cart.cart_gid)} className="link-button">Delete</button>
                        </td>
                        <td>
                            <button type="link" onClick={() => handlePurchase(cart.cart_gid)} className="link-button">Purchase</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;
