import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userOrders } from "../actions/order";
import Loader from "../components/Loader";
import PanelNav from "../components/PanelNav";
import BookingCard from "../components/cards/BookingCard";

const UserPanel = () => {
    const {
        auth: { token },
    } = useSelector((state) => ({ ...state }));

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadUserBookings();
    }, []);

    const loadUserBookings = async () => {
        setLoading(true);
        const res = await userOrders(token);
        setLoading(false);
        console.log(res.data);
        setBookings(res.data);
    };

    const [loading, setLoading] = useState(false);
    return (
        <>
            <div className='conteiner-fluid p-4'>
                <PanelNav />
            </div>
            <div className='container-fluid p-4'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h1>Bookings</h1>
                    </div>
                    <div className='col-md-2'>
                        <Link to='/' className='btn btn-primary'>
                            Browse Hotels
                        </Link>
                    </div>
                </div>
            </div>
            <div className='row'>
                {loading ? (
                    <Loader />
                ) : bookings.length >= 1 ? (
                    bookings.map((b) => <BookingCard key={b._id} hotel={b} />)
                ) : (
                    <h1>no bookings yet</h1>
                )}
            </div>
        </>
    );
};

export default UserPanel;
