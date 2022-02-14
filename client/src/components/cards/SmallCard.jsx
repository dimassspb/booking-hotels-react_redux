import { currencyFormatter, diffDays } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({ hotel, handleHotelDelete, owner = false, showMoreBtn = true }) => {
    const { title, price, location, content, from, to, bed, _id, image } =
        hotel;
    const history = useHistory();
    return (
        <>
            <div className='card mb-3'>
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        {image && image.contentType ? (
                            <img
                                src={`${process.env.REACT_APP_API}/hotel/image/${_id}`}
                                alt='default hotel image'
                                className='card-image img img-fluid'
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
                                {title}{" "}
                                <span className='float-right text-primary'>
                                    {currencyFormatter({
                                        amount: price,
                                        currency: "usd",
                                    })}
                                </span>
                            </h3>
                            <p className='alert alert-info'>{location}</p>
                            <p className='card-text'>{`${content.substring(
                                0,
                                200,
                            )}...`}</p>
                            <p className='card-text'>
                                <span className='float-right text-primary'>
                                    For {diffDays(from, to)}{" "}
                                    {diffDays(from, to) <= 1 ? "day" : "days"}
                                </span>
                            </p>
                            <p className='card-rext'>
                                {bed} {bed <= 1 ? "bed" : "beds"}
                            </p>
                            <p className='card-text'>
                                Available for rent from{" "}
                                {new Date(from).toLocaleDateString()}
                            </p>
                            <div className='d-flex justify-content-between h4'>
                                {showMoreBtn && (
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => {
                                            history.push(`/hotel/${_id}`);
                                        }}
                                    >
                                        Show
                                    </button>
                                )}
                                {owner && (
                                    <>
                                        <Link to={`/hotel/edit/${_id}`}>
                                            <EditOutlined className='text-warning' />
                                        </Link>
                                        <DeleteOutlined
                                            className='text-danger'
                                            onClick={() =>
                                                handleHotelDelete(_id)
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
