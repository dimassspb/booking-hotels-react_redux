import { Link } from "react-router-dom";

const PanelNav = () => {
  const active = window.location.pathname;
  // console.log(active);
    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link
                    className={`nav-link ${
                        active === "/panel" && "active"
                    }`}
                    to='/panel'
                >
                    Bookings
                </Link>
            </li>
            <li className='nav-item'>
                <Link
                    className={`nav-link ${
                        active === "/panel/seller" && "active"
                    }`}
                    to='/panel/seller'
                >
                    Hotels
                </Link>
            </li>
        </ul>
    );
};

export default PanelNav;
