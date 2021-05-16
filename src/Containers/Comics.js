import { useState, useEffect } from "react";

import axios from "axios";
import SearchBar from "../Components/SearchBar";
import Pages from "../Components/Pages";
import Card from "../Components/Card";

const Comics = ({ name, setName }) => {
    const [data, setData] = useState();
    const [pageNb, setPageNb] = useState(1);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);

    const [pageMax, setPageMax] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            const url = `https://marvel-replica.herokuapp.com/comics?skip=${skip}&limit=${limit}&title=${name}`;
            const response = await axios.get(url);

            setData(response.data);
            setLimit(response.data.limit);
            setPageMax(Math.ceil(response.data.count / limit));
            setIsLoading(false);
        };
        fetchdata();
    }, [skip, limit, name]);

    return isLoading ? (
        "en chargement ... "
    ) : (
        <div className=" container">
            <SearchBar setName={setName} />
            <Pages
                pageNb={pageNb}
                setPageNb={setPageNb}
                setSkip={setSkip}
                limit={limit}
                pageMax={pageMax}
                setLimit={setLimit}
            />
            <div className="cards">
                {data.results.map((elem) => {
                    return <Card key={elem._id} elem={elem} comics={true} />;
                })}
            </div>
        </div>
    );
};
export default Comics;
