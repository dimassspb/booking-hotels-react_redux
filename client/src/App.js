import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute"
// components
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserPanel from "./user/UserPanel";
import SellerPanel from "./user/SellerPanel";
import NewHotel from "./hotels/NewHotel";

function App() {
    return (
        <BrowserRouter>
            <TopNav />
            <ToastContainer position='top-center' />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute
                    exact
                    path='/panel'
                    component={UserPanel}
                />
                <PrivateRoute
                    exact
                    path='/panel/seller'
                    component={SellerPanel}
                />
                <PrivateRoute
                    exact
                    path='/hotels/new'
                    component={NewHotel}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
