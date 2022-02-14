import { Link } from "react-router-dom";
import PanelNav from "../components/PanelNav";

const UserPanel = () => {
    return (
        <>
            <div className='container-fluid p-5'>
                <h1>User Panel</h1>
            </div>
            <div className='conteiner-fluid p-4'>
                <PanelNav />
            </div>

            <div className='container-fluid p-4'>
                <div className='row'>
                    <div className='col-md-10'>
                        <h1>Bookings</h1>
                    </div>
                    <div className='col-md-2'>
                        <Link to='/' className='btn btn-primary'>Browse Hotels</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPanel;
