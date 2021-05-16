import Cookies from "js-cookie";
import { useState } from "react";

const Card = ({ elem, setFavorites }) => {
    // const [cookies, setCookies] = useState();

    const favorites = "FavoritesChar";

    const addToFavorites = (elemId) => {
        console.log(elemId);
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
        console.log(tab, cookies);
    };

    return (
        <div className="card">
            <h2>{elem.name}</h2>
            <h2>{elem.title}</h2>
            <i
                className="far fa-heart"
                id="emptyHeart"
                onClick={() => {
                    console.log(elem);
                    addToFavorites(elem.name);
                }}
            ></i>

            <i
                className="fas fa-heart"
                id="filledHeart"
                onClick={() => {
                    deleteFromFavorites(elem.name);
                }}
            ></i>

            <img
                src={elem.thumbnail.path + "." + elem.thumbnail.extension}
                alt={elem.name}
            />
            <p>{elem.description}</p>
        </div>
    );
};

export default Card;
