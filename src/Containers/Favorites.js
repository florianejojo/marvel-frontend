import Cookies from "js-cookie";

const Favorites = () => {
    const cookie = Cookies.get("tabFavs");
    console.log(cookie);
    return <div>Favorites</div>;
};

export default Favorites;
