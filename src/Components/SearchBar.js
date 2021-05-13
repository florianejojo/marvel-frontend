import { useState } from "react";

const SearchBar = ({ setName }) => {
    // const [input, setInput] = useState("");

    // const handleSubmit = (event) => {
    // event.preventDefault();
    // };
    return (
        <div className="container">
            {/* <form onSubmit={handleSubmit}> */}
            <input
                type="text"
                placeholder="Ex : Lorna Dane"
                className="searchBar"
                onChange={(event) => {
                    setName(event.target.value);
                }}
            />

            {/* <button type="submit">Rechercher</button> */}
            {/* </form> */}
        </div>
    );
};

export default SearchBar;
