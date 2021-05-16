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

    const favorites = "FavoritesChar";

    const addToFavorites = (elemId) => {
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

    const deleteFromFavorites = (elemId) => {
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
                        // envoyer soit name soit title
                        if (comics) deleteFromFavorites(elem.title);
                        else deleteFromFavorites(elem.name);
                        setLiked(false);
                    }}
                ></i>
            ) : (
                <i
                    className="far fa-heart"
                    id="emptyHeart"
                    onClick={() => {
                        // console.log(elem);
                        if (comics) addToFavorites(elem.title);
                        else addToFavorites(elem.name);
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
