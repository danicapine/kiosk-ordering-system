// src/services/orderService.js
import { db } from '../config/firebaseConfig';

// Function to add an order to Firestore
const addOrder = async (orderData) => {
    try {
        await db.collection('orders').add(orderData);
        console.log("Order added!");
    } catch (error) {
        console.error("Error adding order: ", error);
    }
};

// Function to retrieve and display orders from Firestore
const getOrders = async () => {
    try {
        const snapshot = await db.collection('orders').get();
        snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data());
        });
    } catch (error) {
        console.error("Error getting orders: ", error);
    }
};

export { addOrder, getOrders };
