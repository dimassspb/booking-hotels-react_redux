import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHotel, sellerHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Error from "../components/Error";
import Loader from "../components/Loader";
import PanelNav from "../components/PanelNav";

const SellerPanel = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    async function loadSellerHotels() {
        try {
            setLoading(true);
            let res = await sellerHotels(auth.token);
            // console.log(res.data);
            setHotels(res.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        await deleteHotel(auth.token, hotelId).then((res) => {
            toast.success(`Hotel deleted`);
            loadSellerHotels(); //
        });
    };

    useEffect(() => {
        loadSellerHotels();
    }, []);
    return (
        <>
            <div className='container-fluid p-5'>
                <h1>Seller Panel</h1>
            </div>
            <div className='conteiner-fluid p-4'>
                <PanelNav />
            </div>
            <div className='container-fluid p-4'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h1>Hotels</h1>
                    </div>
                    <div className='col-md-2'>
                        <Link to='/hotels/new' className='btn btn-primary'>
                            Add new
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    {loading ? (
                        <Loader />
                    ) : hotels.length >= 1 ? (
                        hotels.map((hotel) => (
                            <SmallCard
                                key={hotel._id}
                                hotel={hotel}
                                showMoreBtn={false}
                                handleHotelDelete={handleHotelDelete}
                                owner={true}
                            />
                        ))
                    ) : (
                        <Error />
                    )}
                </div>
            </div>
        </>
    );
};

export default SellerPanel;
