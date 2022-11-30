const axios = require("axios") 
const zlib = require("zlib");

  export default async function searchHandler(req, res) {
    const {
      query,
      method,
    } = req;
  
    switch (method) {
      case "GET":
        //GET PRODUCT RESULTS
        const options = {
          method: "GET",
          url: "https://api.scaleserp.com/search",
          responseType: "arraybuffer", //Important
          params: {
            api_key: process.env.API_KEY,
            q: query.category,
            search_type: "shopping",
            location: "United States",
            sort_by: "review_score",
            max_page: 1,
          },
        };
        axios
          .request(options)
          .then(function (response) {
            zlib.gunzip(response.data, function (_err, output) {
              res.send(output);
            });
          })
          .catch(function (error) {
            console.error(error);
          });
       
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  