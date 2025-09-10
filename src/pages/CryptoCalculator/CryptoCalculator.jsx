import React, { useState, useEffect, useContext } from "react";
import "./CryptoCalculator.css";
import { CoinContext } from "../../context/CoinContext";

const CryptoCalculator = () => {
  const [coins, setCoins] = useState([]);
  const [crypto, setCrypto] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const { currency } = useContext(CoinContext); 

  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
      );
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleCalculate = () => {
    if (!amount || amount <= 0) return;
    const selectedCoin = coins.find((c) => c.id === crypto);
    if (!selectedCoin) return;

   
    const price =
      currency.name === "usd"
        ? selectedCoin.current_price
        : selectedCoin.current_price * (currency.name === "eur" ? 0.91 : 83); // example conversion rate
    setResult((amount * price).toLocaleString(undefined, { maximumFractionDigits: 2 }));
  };

  return (
    <div className="calculator-container">
      <h2>Crypto Calculator</h2>

      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        placeholder="Enter amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Select Cryptocurrency:</label>
      <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
        {coins.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} ({c.symbol.toUpperCase()})
          </option>
        ))}
      </select>

      <button onClick={handleCalculate}>Calculate</button>

      {result && (
        <div className="result">
          {amount} {crypto} = {currency.symbol} {result} {currency.name.toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default CryptoCalculator;
