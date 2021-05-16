import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ elem, fav, comics, char }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (fav) {
            setLiked(true);
        }
    }, [fav]);

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

        cookies = tab.join("|");

        Cookies.set(favorites, cookies);
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

        cookies = tab.join("|");

        Cookies.set(favorites, cookies);
    };

    return (
        <div className="card">
            <h2>{elem.name}</h2>
            <h2>{elem.title}</h2>

            {liked ? (
                <i
                    className="fas fa-heart"
                    id="filledHeart"
                    onClick={() => {
                        deleteFromFavorites(elem);
                        setLiked(false);
                    }}
                ></i>
            ) : (
                <i
                    className="far fa-heart"
                    id="emptyHeart"
                    onClick={() => {
                        addToFavorites(elem);
                        setLiked(true);
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
