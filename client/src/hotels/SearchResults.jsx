import queryString from "query-string";
import { useEffect, useState } from "react";
import { searchRes } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "./../components/forms/Search";

const SearchResults = () => {
    // state
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const { location, date, bed } = queryString.parse(
            window.location.search,
        );
        // console.table({ location, date, bed });
        searchRes({ location, date, bed }).then((res) => {
            setHotels(res.data);
        });
    }, [window.location.search]);
    return (
        <>
            <div className='col'>
                <br />
                <Search />
            </div>
            <div className='container'>
                <div className='row'>
                    {hotels.map((hotel) => (
                        <SmallCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchResults;
