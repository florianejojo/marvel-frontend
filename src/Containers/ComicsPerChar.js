import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const ComicsPerChar = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(
                `http://localhost:3000/comics/${id}`
            );
            setData(response.data);
            console.log(response.data);
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
                    return (
                        <div key={elem._id} className="card">
                            <h2>{elem.title}</h2>
                            <img
                                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                                alt={elem.title}
                            />
                            <p>{elem.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ComicsPerChar;
