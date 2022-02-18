import { useEffect, useState } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";
import Search from "../components/forms/Search";

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 6;

    async function loadAllhotels() {
        try {
            setLoading(true);
            let res = await allHotels();
            // console.log(res.data);
            setHotels(res.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleHotelDelete = () => {
        console.log("hotel deleted");
    };

    useEffect(() => {
        loadAllhotels();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    const count = hotels.length;

    const hotelsCrop = paginate(hotels, currentPage, pageSize);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className='container-fluid h1 p-5 text-center'>
                <h1>Hotels</h1>
            </div>
            <div className='col'>
                <br />
                <Search />
            </div>
            <div className='container-fluid'>
                <br />
                {loading ? (
                    <Loader />
                ) : hotelsCrop.length >= 1 ? (
                    hotelsCrop.map((hotel) => {
                        return (
                            <SmallCard
                                key={hotel._id}
                                hotel={hotel}
                                handleHotelDelete={handleHotelDelete}
                            />
                        );
                    })
                ) : (
                    <h2>No hotels</h2>
                )}
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
};

export default Home;
