import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteHotel, sellerHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Loader from "../components/Loader";
import PanelNav from "../components/PanelNav";

const SellerPanel = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        loadSellerHotels();
    }, []);

    async function loadSellerHotels() {
        try {
            setLoading(true);
            let res = await sellerHotels(auth.token);
            console.log("res.data", res.data);
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

    return (
        <>
            <div className='container-fluid p-4'>
                <PanelNav />
            </div>
            {loading ? (
                <Loader />
            ) : (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-10'>
                            <h2>Your Hotels</h2>
                        </div>
                        <div className='col-md-2'>
                            <Link to='/hotels/new' className='btn btn-primary'>
                                Add Hotel
                            </Link>
                        </div>
                    </div>

                    <div className='row'>
                        {hotels.map((hotel) => (
                            <SmallCard
                                key={hotel._id}
                                hotel={hotel}
                                showViewMoreButton={false}
                                owner={true}
                                handleHotelDelete={handleHotelDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SellerPanel;
