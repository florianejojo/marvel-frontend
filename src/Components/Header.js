import LogoMarvel from "../assets/logoMarvel.svg";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="header">
                <div className=" header container">
                    <Link to="/">
                        <img src={LogoMarvel} alt="logoMarvel" id="logo" />
                    </Link>

                    <nav>
                        <Link to="/">
                            <button>Personnages</button>
                        </Link>
                        <Link to="/comics">
                            <button>Comics</button>
                        </Link>
                        <Link to="/favoris">
                            <button>Favoris</button>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
