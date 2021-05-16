import { useState } from "react";

const SearchBar = ({ setName }) => {
    function escapeRegExp(str) {
        return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
    }

    const handleChange = (event) => {
        let str = event.target.value;

        let exp = new RegExp(escapeRegExp(str));
        str = String(exp);

        const newstr = str.slice(1, str.length - 1);
        console.log(newstr);

        setName(newstr);
    };

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Ex : Lorna Dane"
                className="searchBar"
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
