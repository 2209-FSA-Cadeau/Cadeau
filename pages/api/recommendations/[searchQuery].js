const axios = require("axios")
const zlib = require("zlib");

  export default async function searchHandler(req, res) {
    const {
      query, //{pid:, query: query:}
      method,
    } = req;

    let searchItem
    console.log("QUERY", query)
    if(Object.keys(query).length === 1 || query.category === "all"){
      if(query.category){
        searchItem = query.value
      } else {
        searchItem = query.searchQuery
      }
      console.log("HIT NO FILTER", searchItem)
    } else {
      searchItem = query.category + " " + query.value
      console.log("HIT FILTER", searchItem)
    }

    switch (method) {
      case "GET":
        //GET PRODUCT RESULTS
        const options = {
          method: "GET",
          url: "https://api.scaleserp.com/search",
          responseType: "arraybuffer", //Important
          params: {
            api_key: process.env.API_KEY,
            q: searchItem,
            search_type: "shopping",
            location: "United States",
            sort_by: "review_score",
            max_page: 1,
            hide_base64_images: "true",
            include_fields: "shopping_results"
          },
        };
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data)
            // res.send(response.data)
            zlib.gunzip(response.data, function (_err, output) {
              console.log("THIS IS THE OUTPUT", output)
              res.send(output)
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

