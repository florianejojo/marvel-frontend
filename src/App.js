import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import background from "./assets/avengers.jpeg";

import Header from "./Components/Header.js";
// import Home from "./Containers/Home";
import ComicsPerChar from "./Containers/ComicsPerChar";
import Favorites from "./Containers/Favorites";
import Characters from "./Containers/Characters";
// import Background from "./Components/Background";
import Cookies from "js-cookie";
import Comics from "./Containers/Comics";

import stars from "../src/assets/ciel-etoile.jpeg";

function App() {
    const [tabCookies, setTabCookies] = useState(
        Cookies.get("Favorites") || ""
    );
    // console.log(tabCookies);
    const [name, setName] = useState("");

    const setFavorites = (elemId) => {
        Cookies.set("Favorites", elemId);
        setTabCookies(elemId);
    };
    return (
        <Router>
            {/* <div className="background "> */}
            <Header />
            {/* <img src={background} alt={background} className="background" /> */}

            <Switch>
                <Route path="/comics/:id">
                    <ComicsPerChar />
                </Route>
                <Route path="/comics">
                    <Comics name={name} setName={setName} />
                </Route>
                <Route path="/favoris">
                    <Favorites name={name} setName={setName} />
                </Route>
                <Route path="/">
                    <Characters
                        tabCookies={tabCookies}
                        setTabCookies={setTabCookies}
                        setFavorites={setFavorites}
                        name={name}
                        setName={setName}
                    />
                </Route>
            </Switch>
            {/* </div> */}
        </Router>
    );
}

export default App;
