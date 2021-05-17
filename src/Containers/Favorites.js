import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Favorites = ({ escapeRegExp }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const cookie = Cookies.get("Favorites");

        if (!cookie) {
            setIsLoading(false);
            return;
        }
        let tab = cookie.split("|");

        const fetchdata = async () => {
            try {
                tab = await Promise.all(
                    tab.map(async (elem) => {
                        let exp = new RegExp(escapeRegExp(elem));
                        let str = String(exp);
                        if (str[1] === "A") {
                            var route = "characters";
                            var title = "name";
                        }
                        if (str[1] === "O") {
                            route = "comics";
                            title = "title";
                        }
                        const newstr = str.slice(2, str.length - 1);
                        const url = `https://marvel-replica.herokuapp.com/${route}?${title}=${newstr}`;

                        const response = await axios.get(url);
                        return response.data.results;
                    })
                );

                setData(tab);
            } catch (error) {
                console.log(error.message);
            }
        };
        if (tab) fetchdata();

        setIsLoading(false);
    }, [escapeRegExp]);

    return isLoading ? (
        "isLoading..."
    ) : (
        <div className="container cards">
            {data.map((elem) => {
                return (
                    <Card
                        key={elem[0]._id}
                        elem={elem[0]}
                        fav={true}
                        char={elem[0].name}
                    />
                );
            })}
        </div>
    );
};

export default Favorites;
