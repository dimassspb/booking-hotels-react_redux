import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { capitalizeName } from "../utils/capitalizeName";

const NavBar = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null,
        });
        window.localStorage.removeItem("auth");
        history.push("/login");
    };

    return (
        <div className='navbar sticky-top navbar-dark bg-primary'>
            <Link className='nav-link' style={{ color: "#FFFFFF" }} to='/'>
                Home
            </Link>

            {auth !== null && (
                <Link
                    className='nav-link'
                    style={{ color: "#FFFFFF" }}
                    to='/panel'
                >
                    {capitalizeName(auth.user.name)} Panel
                </Link>
            )}

            {auth !== null && (
                <>
                    <a
                        className='nav-link'
                        style={{ color: "#FFFFFF" }}
                        onClick={logout}
                    >
                        Logout
                    </a>
                </>
            )}
            {auth === null && (
                <>
                    <Link
                        className='nav-link'
                        style={{ color: "#FFFFFF" }}
                        to='/login'
                    >
                        Login
                    </Link>
                    <Link
                        className='nav-link'
                        style={{ color: "#FFFFFF" }}
                        to='/register'
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    );
};

export default NavBar;
