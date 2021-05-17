import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./Components/Header.js";
import ComicsPerChar from "./Containers/ComicsPerChar";
import Favorites from "./Containers/Favorites";
import Characters from "./Containers/Characters";
import Comics from "./Containers/Comics";

function App() {
    const [name, setName] = useState("");

    const escapeRegExp = (str) => {
        return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
    };

    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/comics/:id">
                    <ComicsPerChar />
                </Route>
                <Route path="/comics">
                    <Comics
                        name={name}
                        setName={setName}
                        escapeRegExp={escapeRegExp}
                    />
                </Route>
                <Route path="/favoris">
                    <Favorites
                        name={name}
                        setName={setName}
                        escapeRegExp={escapeRegExp}
                    />
                </Route>
                <Route path="/">
                    <Characters
                        name={name}
                        setName={setName}
                        escapeRegExp={escapeRegExp}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
