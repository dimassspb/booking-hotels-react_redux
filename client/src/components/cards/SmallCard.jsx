import { currencyFormatter } from "../../utils/currencyFormatter";
import { diffDays } from "../../utils/diffDays.js";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
    hotel,
    handleHotelDelete,
    owner = false,
    showMoreBtn = true,
}) => {
    const history = useHistory();
    return (
        <>
            <div className='card mb-3'>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        {hotel.image && hotel.image.contentType ? (
                            <img
                                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                                alt='default hotel image'
                                className='card-image img img-fluid'
                                style={{maxWidth: '500px'}}
                            />
                        ) : (
                            <img
                                src='https://via.placeholder.com/900x500.png?text=Booking'
                                alt='default hotel image'
                                className='card-image img img-fluid'
                            />
                        )}
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <h3 className='card-title'>
                                {hotel.title}
                                <span className='float-right text-primary'>
                                    {currencyFormatter(hotel.price)}
                                </span>
                            </h3>
                            <p className='alert alert-info'>{hotel.location}</p>
                            <p className='card-text'>{`${hotel.content.substring(
                                0,
                                200,
                            )}...`}</p>
                            <p className='card-text'>
                                <span className='float-right text-primary'>
                                    For {diffDays(hotel.from, hotel.to)}
                                    {diffDays(hotel.from, hotel.to) <= 1
                                        ? "day"
                                        : "days"}
                                </span>
                            </p>
                            <p className='card-rext'>
                                {hotel.bed} {hotel.bed <= 1 ? "bed" : "beds"}
                            </p>
                            <p className='card-text'>
                                Available for rent from{" "}
                                {new Date(hotel.from).toLocaleDateString()}
                            </p>
                            <div className='d-flex justify-content-between h4'>
                                {showMoreBtn && (
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => {
                                            history.push(`/hotel/${hotel._id}`);
                                        }}
                                    >
                                        Show
                                    </button>
                                )}
                                {owner && (
                                    <>
                                        <Link to={`/hotel/edit/${hotel._id}`}>
                                            <EditOutlined className='text-warning' />
                                        </Link>
                                        <DeleteOutlined
                                            className='text-danger'
                                            onClick={() =>
                                                handleHotelDelete(hotel._id)
                                            }
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmallCard;
