import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Card = ({ elem, setFavorites, fav, comics }) => {
    const [cookies, setCookies] = useState();
    const history = useHistory();

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (fav) {
            setLiked(true);
        }
    }, []);

    const favorites = "Favorites";

    const addToFavorites = (elem) => {
        if (comics) {
            var elemId = "O" + elem.title;
        } else {
            var elemId = "A" + elem.name;
        }
        let cookies = Cookies.get(favorites);
        let tab = [];
        if (cookies) {
            tab = cookies.split("|");

            const index = tab.indexOf(elemId);
            if (index >= 0) return;
        }
        tab.push(elemId);
        console.log(tab);
        cookies = tab.join("|");

        Cookies.set(favorites, cookies);
    };

    const deleteFromFavorites = (elem) => {
        if (comics) {
            var elemId = "O" + elem.title;
        } else {
            var elemId = "A" + elem.name;
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
        console.log(tab);
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
                        // envoyer soit name soit title
                        deleteFromFavorites(elem);
                        setLiked(false);
                    }}
                ></i>
            ) : (
                <i
                    className="far fa-heart"
                    id="emptyHeart"
                    onClick={() => {
                        // console.log(elem);
                        addToFavorites(elem);
                        setLiked(true);
                    }}
                ></i>
            )}

            <img
                src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                alt={elem.name}
            />
            <p>{elem.description}</p>
        </div>
    );
};

export default Card;
