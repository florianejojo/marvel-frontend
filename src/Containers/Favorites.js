import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        // récupérer mes cookies
        const cookie = Cookies.get("FavoritesChar");
        console.log(cookie);
        if (!cookie) {
            setIsLoading(false);
            return;
        }

        // mettre les cookies dans un tableau : tab[0] = string

        let tab = cookie.split("|");

        // convertir le tableau au bon format pour la requête + update le name

        function escapeRegExp(str) {
            return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
        }

        const fetchdata = async () => {
            try {
                tab = await Promise.all(
                    tab.map(async (elem) => {
                        let exp = new RegExp(escapeRegExp(elem));
                        let str = String(exp);
                        const newstr = str.slice(1, str.length - 1);
                        const url = `http://localhost:3000/characters?name=${newstr}`;
                        const response = await axios.get(url);
                        return response.data.results;
                    })
                );
                // console.log(tab[0][0].name);
                setData(tab);
            } catch (error) {
                console.log(error);
            }
        };
        if (tab) fetchdata();

        setIsLoading(false);
        console.log(data);
    }, []);

    return isLoading ? (
        "isLoading..."
    ) : (
        <div className="container cards">
            {data.map((elem) => {
                return (
                    <Card elem={elem[0]} fav={true} />
                    // <div className="card">
                    //     <h2> {elem[0].name}</h2>
                    //     <img
                    //         src={
                    //             elem[0].thumbnail.path +
                    //             "." +
                    //             elem[0].thumbnail.extension
                    //         }
                    //         alt={elem[0].name}
                    //     />
                    // </div>
                );
            })}
        </div>
    );
};

export default Favorites;
