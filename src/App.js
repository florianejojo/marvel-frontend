import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./Components/Header.js";
// import Home from "./Containers/Home";
import ComicsPerChar from "./Containers/ComicsPerChar";
import Favorites from "./Containers/Favorites";
import Characters from "./Containers/Characters";
// import Background from "./Components/Background";
import Cookies from "js-cookie";
import Comics from "./Containers/Comics";

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
            <Header></Header>
            <Switch>
                <Route path="/comics/:id">
                    <ComicsPerChar />
                </Route>
                <Route path="/comics">
                    <Comics />
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
        </Router>
    );
}

export default App;
