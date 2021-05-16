const SearchBar = ({ setName }) => {
    function escapeRegExp(str) {
        return str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
    }

    const handleChange = (event) => {
        let str = event.target.value;

        let exp = new RegExp(escapeRegExp(str));
        str = String(exp);

        const newstr = str.slice(1, str.length - 1);

        setName(newstr);
    };

    return (
        <div className="container searchBar">
            <input
                type="text"
                placeholder="Ex : Lorna Dane"
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
