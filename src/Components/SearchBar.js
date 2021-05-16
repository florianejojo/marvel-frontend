import { useState } from "react";

const SearchBar = ({ setName }) => {
    // const [input, setInput] = useState("");

    function escapeRegExp(str) {
        return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
    }

    const handleChange = (event) => {
        let str = event.target.value;

        let exp = new RegExp(escapeRegExp(str));
        str = String(exp);
        console.log(typeof str);

        const newstr = str.slice(1, str.length - 1);

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
