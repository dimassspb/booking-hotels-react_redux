import { useEffect, useState } from "react";
import { show, isAlreadyBooked } from "../actions/hotel";
import { toast } from "react-toastify";
import { diffDays } from "../utils/diffDays.js";
import Loader from "../components/Loader";
import moment from "moment";
import { useSelector } from "react-redux";
import { createOrder } from "../actions/order";

const AboutHotel = ({ match, history }) => {
    // redux
    const { auth } = useSelector((state) => ({ ...state }));
    // state
    const [hotel, setHotel] = useState({});
    const [loading, setLoading] = useState();
    const [image, setImage] = useState();
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    useEffect(() => {
        loadSellerHotel();
    }, []);

    useEffect(() => {
        if (auth && auth.token) {
            isAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
                // console.log("isAlreadyBooked", res);
                if (res.data.ok) setAlreadyBooked(true);
            });
        }
    }, []);

    const loadSellerHotel = async () => {
        setLoading(true);
        let res = await show(match.params.hotelId);
        setLoading(false);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!auth || !auth.token) {
            history.push("/login");
            return;
        }

        if (auth && auth.token) {
            createOrder(auth.token, match.params.hotelId, hotel, image).then(
                (res) => {
                    toast.success("Order create!");
                    history.push("/panel");
                },
            );
        }
    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className='container-fluid p-5 text-center'>
                        <h2>{hotel.title}</h2>
                    </div>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <br />
                                <img
                                    src={image}
                                    alt={hotel.title}
                                    className='img img-fluid m-2'
                                />
                            </div>
                            <div className='col-md-6'>
                                <p className='alert alert-info'>
                                    {hotel.location}
                                </p>
                                <br />
                                <b>{hotel.content}</b>
                                <p className='alert alert-info mt-3'>
                                    {hotel.price} euro
                                </p>
                                <p className='card-text'>
                                    <span className='float-right text-primary'>
                                        For {diffDays(hotel.from, hotel.to)}{" "}
                                        {diffDays(hotel.from, hotel.to) <= 1
                                            ? "day"
                                            : "days"}
                                    </span>
                                </p>
                                <p>
                                    From <br />{" "}
                                    {moment(new Date(hotel.from)).format(
                                        "MMMM Do YYYY, h:mm:ss a",
                                    )}
                                </p>
                                <p>
                                    To <br />{" "}
                                    {moment(new Date(hotel.to)).format(
                                        "MMMM Do YYYY, h:mm:ss a",
                                    )}
                                </p>
                                <i>
                                    Posted by{" "}
                                    {hotel.postedBy && hotel.postedBy.name}
                                </i>
                                <br />
                                <button
                                    onClick={handleClick}
                                    className='btn btn-block btn-lg btn-primary mt-3'
                                    disabled={loading || alreadyBooked}
                                >
                                    {loading
                                        ? "Loading..."
                                        : alreadyBooked
                                        ? "Already Booked"
                                        : auth && auth.token
                                        ? "Book Now"
                                        : "Login to Book"}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AboutHotel;
