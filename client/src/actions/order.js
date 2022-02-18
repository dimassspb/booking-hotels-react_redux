import axios from "axios";

export const createOrder = async (token, image, hotel) =>
    await axios.post(
        `${process.env.REACT_APP_API}/order-create`,
        { image, hotel },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    export const userOrders = async (token) =>
        await axios.get(`${process.env.REACT_APP_API}/user-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
