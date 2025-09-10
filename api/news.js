// api/news.js
export default async function handler(req, res) {
  const url = `https://api.thenewsapi.net/crypto?apikey=${process.env.NEWS_API_KEY}&q=(Crypto)&within=7d&categories=news,mining,blockchain,opinion,web3,stablecoins,finance,business,policy&page=1&size=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Fix CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
