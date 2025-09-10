import { createContext, useEffect, useState } from "react";

const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "x-cg-demo-api-key": "CG-b6jHqMS7U235rg9zFX8Ubr2a",
                    },
                }
            );
            const data = await res.json();
            setAllCoin(data);
        } catch (err) {
            console.error("Error fetching coins:", err);
        }
    };

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin,
        currency,
        setCurrency,
    };

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
export { CoinContext };
