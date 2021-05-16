import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pages from "../Components/Pages";
import SearchBar from "../Components/SearchBar";
import Cookies from "js-cookie";
import Card from "../Components/Card";

const Characters = ({ name, setName }) => {
    const [data, setData] = useState();
    const favorites = "FavoritesChar";

    //numéros de pages affichés
    const [pageNb, setPageNb] = useState(1);

    // pour faire une nouvelle requete avec le bon skip
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);

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
                        <Card key={elem._id} elem={elem} char={true} />

                        // </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
