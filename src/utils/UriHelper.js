export const UriHelper = (method) => {
   return `https://www.alphavantage.co/query?function=${method}&apikey=${process.env.REACT_APP_API_KEY}`;
};