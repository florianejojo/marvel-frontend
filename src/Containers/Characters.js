import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pages from "../Components/Pages";
import SearchBar from "../Components/SearchBar";
import Cookies from "js-cookie";
import Card from "../Components/Card";

const Characters = ({
    tabCookies,
    setTabCookies,
    setFavorites,
    name,
    setName,
}) => {
    const [data, setData] = useState();
    const favorites = "FavoritesChar";

    //numéros de pages affichés
    const [pageNb, setPageNb] = useState(1);

    // pour faire une nouvelle requete avec le bon skip
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(5);

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

    // const addToFavorites = (elemId) => {
    //     let cookies = Cookies.get(favorites);
    //     let tab = [];
    //     if (cookies) {
    //         tab = cookies.split("|");

    //         const index = tab.indexOf(elemId);
    //         if (index >= 0) return;
    //     }
    //     tab.push(elemId);
    //     cookies = tab.join("|");
    //     Cookies.set(favorites, cookies);
    // };

    // const deleteFromFavorites = (elemId) => {
    //     let cookies = Cookies.get(favorites);
    //     if (!cookies) {
    //         return;
    //     }
    //     const tab = cookies.split("|");

    //     const index = tab.indexOf(elemId);

    //     if (index < 0) {
    //         return;
    //     }
    //     if (tab.length === 1) {
    //         Cookies.remove(favorites);
    //     }

    //     tab.splice(index);
    //     cookies = tab.join("|");
    //     Cookies.set(favorites, cookies);
    //     console.log(tab, cookies);
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
                        // <Link to={`/comics/${elem._id}`}>
                        <Card
                            key={elem._id}
                            elem={elem}
                            tabCookies={tabCookies}
                            setTabCookies={setTabCookies}
                            setFavorites={setFavorites}
                        />
                        // {/* <div key={elem._id} className="card">
                        //     <h2>{elem.name}</h2>
                        //     <img
                        //         src={
                        //             elem.thumbnail.path +
                        //             "." +
                        //             elem.thumbnail.extension
                        //         }
                        //         alt={elem.name}
                        //     />
                        //     <p>{elem.description}</p>
                        // </div> */}
                        // </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
