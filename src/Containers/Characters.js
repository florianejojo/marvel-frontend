import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pages from "../Components/Pages";
import SearchBar from "../Components/SearchBar";

const Characters = () => {
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
            // setSkip(response.data.limit * pageNb);
            setIsLoading(false);
        };
        fetchdata();
    }, [skip, limit, name]);
    console.log("limit", limit);
    console.log("pageNb", pageNb);
    console.log("skip", skip);
    console.log("pageMax", pageMax);

    console.log(name);

    return isLoading ? (
        "isLoading..."
    ) : (
        <div>
            <SearchBar setName={setName} />
            <Pages
                // pageMax={pages.pageMax}
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
                            <Link to={`/comics/${elem._id}`}>
                                <h1>{elem.name}</h1>
                                <img
                                    src={
                                        elem.thumbnail.path +
                                        "." +
                                        elem.thumbnail.extension
                                    }
                                    alt={elem.name}
                                />
                                <p>{elem.description}</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
