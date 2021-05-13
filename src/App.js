import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header.js";
// import Home from "./Containers/Home";
import Comics from "./Containers/Comics";
import Favorites from "./Containers/Favorites";
import Characters from "./Containers/Characters";
// import Background from "./Components/Background";

function App() {
    return (
        <Router>
            <Header></Header>
            <Switch>
                {/* <Route path="/personnages"></Route> */}
                <Route path="/comics">
                    <Comics />
                </Route>
                <Route path="/favoris">
                    <Favorites />
                </Route>
                <Route path="/">
                    <Characters />
                </Route>
            </Switch>
            {/* <Background></Background> */}
        </Router>
    );
}

export default App;
