import axios from "axios";

export const createHotel = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const allHotels = async () =>
    await axios.get(`api/hotels`);

export const sellerHotels = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const deleteHotel = async (token, hotelId) =>
    await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const show = async (hotelId) =>
    await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

export const refreshHotel = async (token, data, hotelId) =>
    await axios.put(
        `${process.env.REACT_APP_API}/refresh-hotel/${hotelId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

export const isAlreadyBooked = async (token, hotelId) =>
    await axios.get(
        `${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

export const searchRes = async (query) =>
    await axios.post(`${process.env.REACT_APP_API}/search-res`, query);
