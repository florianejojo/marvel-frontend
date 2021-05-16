// import { useState } from "react";

const Pages = ({ pageNb, setPageNb, setSkip, limit, pageMax, setLimit }) => {
    // const [pageMax, setPageMax] = useState(Math.ceil(count / limit));

    return (
        <div className="container pages">
            <button
                onClick={() => {
                    if (pageNb > 1) {
                        // je veux faire une nouvelle requete avec les 100 éléments suivant || aux "skip = limit * pageNb" prochains résulats

                        setPageNb(pageNb - 1);
                        setSkip(limit * pageNb - limit * 2);
                    }
                }}
            >
                -
            </button>
            <span>
                Page : {pageNb} / {pageMax}
            </span>
            <button
                onClick={() => {
                    if (pageNb < pageMax) {
                        setPageNb(pageNb + 1);
                        setSkip(limit * pageNb);
                    }
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    setLimit(10);
                }}
            >
                10 fiches par page
            </button>
            <button
                onClick={() => {
                    setLimit(30);
                }}
            >
                30 fiches par page
            </button>
            <button
                onClick={() => {
                    setLimit(100);
                }}
            >
                100 fiches par page
            </button>
        </div>
    );
};

export default Pages;
