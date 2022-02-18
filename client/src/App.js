import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserPanel from "./user/UserPanel";
import SellerPanel from "./user/SellerPanel";
import NewHotel from "./hotels/NewHotel";
import EditHotel from "./hotels/EditHotel";
import AboutHotel from "./hotels/AboutHotel.jsx";
import SearchResults from "./hotels/SearchResults";

function App() {
    return (
        <BrowserRouter>
            <TopNav />
            <ToastContainer position='top-center' />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/panel' component={UserPanel} />
                <PrivateRoute
                    exact
                    path='/panel/seller'
                    component={SellerPanel}
                />
                <PrivateRoute exact path='/hotels/new' component={NewHotel} />
                <PrivateRoute
                    exact
                    path='/hotel/edit/:hotelId'
                    component={EditHotel}
                />
                <Route exact path='/hotel/:hotelId' component={AboutHotel} />
                <Route exact path='/search' component={SearchResults} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
