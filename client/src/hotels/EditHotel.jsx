import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { show, refreshHotel } from "./../actions/hotel";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import HotelEditForm from "../components/forms/HotelEditForm";

const EditHotel = ({ match }) => {
    // redux
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    // state

    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        price: "",
        from: "",
        to: "",
        bed: "",
    });

    const [preview, setPreview] = useState(
        "https:via.placeholder.com/100x100.png?text=PREVIEW",
    );
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const [image, setImage] = useState();

    // destructuring
    const { title, content, location, price, from, to, bed } = values;

    async function loadSellerHotel() {
        try {
            setLoading(true);
            let res = await show(match.params.hotelId);
            // console.log(res);
            setValues({ ...values, ...res.data });
            setPreview(
                `${process.env.REACT_APP_API}/hotel/image/${res.data._id}`,
            );
            setLoading(false);
        } catch (error) {
            setError(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hotelData = new FormData();
        hotelData.append("title", title);
        hotelData.append("content", content);
        hotelData.append("location", location);
        hotelData.append("price", price);
        image && hotelData.append("image", image);
        hotelData.append("from", from);
        hotelData.append("to", to);
        hotelData.append("bed", bed);

        try {
            let res = await refreshHotel(token, hotelData, match.params.hotelId);
            console.log("HOTEL UPDATED", res);
            toast.success("Hotel is updated!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    };

    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadSellerHotel();
    }, []);

    return (
        <>
            <div className='container-fluid p-5 text-center'>
                <h2>Edit hotel</h2>
            </div>
            <div className='container-fluid'>
                {loading ? (
                    <Loader />
                ) : (
                    <div className='row'>
                        <div className='col-md-10'>
                            <br />
                            <HotelEditForm
                                values={values}
                                setValues={setValues}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleImageChange={handleImageChange}
                            />
                        </div>
                        <div className='col-md-2'>
                            <img
                                src={preview}
                                alt='preview_image'
                                className='img img-fluid m-2'
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditHotel;
