import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from "../Components/Card";
import axios from "axios";

const ComicsPerChar = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(
                `https://marvel-replica.herokuapp.com/comics/${id}`
            );
            setData(response.data);

            setIsLoading(false);
        };
        fetchdata();
    }, [id]);

    return isLoading ? (
        "en chargement ... "
    ) : (
        <div className=" container">
            <h1>{data.name}</h1>
            <div className="cards">
                {data.comics.map((elem) => {
                    return <Card key={elem._id} elem={elem} comics={true} />;
                })}
            </div>
        </div>
    );
};

export default ComicsPerChar;
