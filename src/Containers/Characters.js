import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pages from "../Components/Pages";
import SearchBar from "../Components/SearchBar";
import Cookies from "js-cookie";

const Characters = ({ tabCookies, setTabCookies, setFavorites }) => {
    const [data, setData] = useState();

    //numéros de pages affichés
    const [pageNb, setPageNb] = useState(1);

    // pour faire une nouvelle requete avec le bon skip
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(3);
    const [name, setName] = useState("");

    const [pageMax, setPageMax] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(
                `http://localhost:3000/characters?skip=${skip}&limit=${limit}&name=${name}`
            );

            setData(response.data.results);
            setLimit(response.data.limit);
            setPageMax(Math.ceil(response.data.count / limit));
            setIsLoading(false);
        };
        fetchdata();
    }, [skip, limit, name]);

    // const tabCookies = [];
    // const addToFavorites = (elemId) => {
    // setTabCookies(Cookies.get("Favorites"));
    // const newTab = [...tabCookies];
    // Modifie la copie
    // newTab.push(elemId);
    // Mette à jour le state avec la copie

    // setFavorites(newTab);
    // };

    // const deleteFromFavorites = (elemId) => {
    //     let tabCookies = [];
    //     if (Cookies.get("Favorites")) {
    //         tabCookies = Cookies.get("Favorites");
    //     }
    //     const index = tabCookies.findIndex(elemId);
    //     tabCookies.splice(index, 1);
    //     Cookies.set("Favorites", tabCookies);
    //     console.log(tabCookies);
    // };

    return isLoading ? (
        "isLoading..."
    ) : (
        <div>
            <SearchBar setName={setName} />
            <Pages
                pageNb={pageNb}
                setPageNb={setPageNb}
                setSkip={setSkip}
                limit={limit}
                pageMax={pageMax}
                setLimit={setLimit}
            />
            <div className="container cards">
                {data.map((elem) => {
                    return (
                        <div key={elem._id} className="card">
                            <h1>{elem.name}</h1>

                            <i
                                className="far fa-heart"
                                id="emptyHeart"
                                // onClick={() => {
                                //     addToFavorites(elem._id);
                                // }}
                            ></i>

                            <i
                                className="fas fa-heart"
                                id="filledHeart"
                                // onClick={() => {
                                //     deleteFromFavorites(elem._id);
                                // }}
                            ></i>
                            <Link to={`/comics/${elem._id}`}>
                                <img
                                    src={
                                        elem.thumbnail.path +
                                        "." +
                                        elem.thumbnail.extension
                                    }
                                    alt={elem.name}
                                />
                            </Link>

                            <p>{elem.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
