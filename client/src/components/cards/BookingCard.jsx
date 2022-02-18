import { currencyFormatter } from "../../utils/currencyFormatter";
import { diffDays } from "../../utils/diffDays";
import { useHistory } from "react-router-dom";

const BookingCard = ({ hotel }) => {
    return (
        <>
            <div className='card mb-3'>
                <div className='row no-gutters'>
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
                                    for {diffDays(hotel.from, hotel.to)}
                                    {diffDays(hotel.from, hotel.to) <= 1
                                        ? " day"
                                        : " days"}
                                </span>
                            </p>
                            <p className='card-text'>{hotel.bed} bed</p>
                            <p className='card-text'>
                                Available from{" "}
                                {new Date(hotel.from).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingCard;
