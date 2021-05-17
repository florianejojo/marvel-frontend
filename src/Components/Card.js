import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ elem, fav, comics, char }) => {
    const [liked, setLiked] = useState(false);
    const [tabCookies, setTabCookies] = useState([]);

    useEffect(() => {
        // if (fav) {
        //     setLiked(true);
        // }
        const cookie = Cookies.get("Favorites");

        if (!cookie) {
            return;
        }
        let tab = cookie.split("|");
        tab = tab.map((elem) => {
            const newstr = elem.slice(1);
            return newstr;
        });
        setTabCookies(tab);

        // on cherche l'index de title ou name dans elem, si on le trouve: setLiked(True)
    }, []);

    const favorites = "Favorites";

    const addToFavorites = (elem) => {
        if (comics) {
            var elemId = "O" + elem.title;
        } else {
            elemId = "A" + elem.name;
        }
        let cookies = Cookies.get(favorites);
        let tab = [];
        if (cookies) {
            tab = cookies.split("|");

            const index = tab.indexOf(elemId);
            if (index >= 0) return;
        }
        tab.push(elemId);
        setTabCookies(tab);
        console.log(tabCookies);

        cookies = tab.join("|");

        Cookies.set(favorites, cookies);
        setLiked(true);
    };

    const deleteFromFavorites = (elem) => {
        if (elem.title) {
            var elemId = "O" + elem.title;
        } else {
            elemId = "A" + elem.name;
        }
        let cookies = Cookies.get(favorites);

        if (!cookies) {
            return;
        }
        const tab = cookies.split("|");

        const index = tab.indexOf(elemId);

        if (index < 0) {
            return;
        }
        if (tab.length === 1) {
            Cookies.remove(favorites);
        }
        tab.splice(index);
        setTabCookies(tab);

        cookies = tab.join("|");

        Cookies.set(favorites, cookies);
        setLiked(false);
    };

    return (
        <div className="card">
            {console.log(tabCookies.indexOf(elem.name || elem.title))}
            <h2>{elem.name}</h2>
            <h2>{elem.title}</h2>

            {tabCookies.indexOf(elem.name || elem.title) >= 0 || liked ? (
                <i
                    className="fas fa-heart"
                    id="filledHeart"
                    onClick={() => {
                        deleteFromFavorites(elem);
                    }}
                ></i>
            ) : (
                <i
                    className="far fa-heart"
                    id="emptyHeart"
                    onClick={() => {
                        addToFavorites(elem);
                    }}
                ></i>
            )}
            {char ? (
                <Link to={`/comics/${elem._id}`}>
                    <img
                        src={
                            elem.thumbnail.path + "." + elem.thumbnail.extension
                        }
                        alt={elem.name}
                    />
                </Link>
            ) : (
                <img
                    src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                    alt={elem.name}
                />
            )}

            <p>{elem.description}</p>
        </div>
    );
};

export default Card;
