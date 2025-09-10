import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);

    const url = "https://api.thenewsapi.net/crypto?apikey=14BBCCEA5E2AD3F6D3D2ED2FB3A1D193&q=(Crypto)&within=7d&categories=news,mining,blockchain,opinion,web3,stablecoins,finance,business,policy&page=1&size=10";

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Fetched news:", data);

      
      if (data.data && data.data.results && Array.isArray(data.data.results)) {
        setNews(data.data.results);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to load news.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="news">
      <h2>Latest Crypto News</h2>
      <div className="news-list">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-card">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3>{article.title}</h3>
              </a>
              <p>{article.source?.name}</p>
              <span>
                {article.published_at
                  ? new Date(article.published_at).toLocaleString()
                  : ""}
              </span>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default News;
