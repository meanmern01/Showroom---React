import {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Component/authentication/Login/Login";
import LoginCompleted from "./Component/authentication/Login Complete/LoginCompleted";
import Signup from "./Component/authentication/Signup/Signup";
import SignupCompleted from "./Component/authentication/Signup Complete/SignupCompleted";
import Calendar from "./Component/Calendar/Calendar";

import "./App.scss";
import BrandList from "./Component/Index/BrandList";
import MainBanner from "./Component/Main/MainBanner";
import MainBannerTwo from "./Component/Main/MainBanner/MainBannerTwo";
import Brandinfo1 from "./Component/BrandInfo/Brandinfo1";
import Brandinfo2 from "./Component/BrandInfo/Brandinfo2";
import Brandinfo3 from "./Component/BrandInfo/Brandinfo3";

function App() {
    // Get url path for dynamic routing of login
    const [urlPath, setUrlPath] = useState("");
    const handleLoadUrlPath = (data) => {
        setUrlPath(data);
    };

    // Load logged in user
    const [loggedInUser, setLoggedInUser] = useState(null);
    const handleLoadLoggedInUser = (data) => {
        setLoggedInUser(data);
    };

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainBanner}></Route>
                <Route
                    exact
                    path="/login"
                    component={() => (
                        <Login
                            urlPath={urlPath}
                            loadLoggedInUser={handleLoadLoggedInUser}
                        />
                    )}
                ></Route>
                <Route
                    exact
                    path="/login-completed"
                    component={LoginCompleted}
                ></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route
                    exact
                    path="/signup-completed"
                    component={SignupCompleted}
                ></Route>
                <Route exact path="/new" component={MainBannerTwo}></Route>
                <Route
                    exact
                    path="/calendar"
                    component={() => (
                        <Calendar
                            loadUrlPath={handleLoadUrlPath}
                            loggedInUser={loggedInUser}
                        />
                    )}
                ></Route>
                <Route path="/index" component={BrandList}></Route>
                <Route exact path="/brandinfo1" component={Brandinfo1}></Route>
                <Route exact path="/brandinfo2" component={Brandinfo2}></Route>
                <Route exact path="/brandinfo3" component={Brandinfo3}></Route>
            </Switch>
        </Router>
    );
}

export default App;
