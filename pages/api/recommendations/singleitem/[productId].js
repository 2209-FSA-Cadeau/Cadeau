const axios = require("axios")
const zlib = require("zlib");

  export default async function productIdHandler(req, res) {
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
            search_type: "product",
            product_id: query.productId,
            location: "United States",
            sort_by: "review_score",
            max_page: 1,
            hide_base64_images: "true",
            include_fields: "product_results"
          },
        };
        axios
          .request(options)
          .then(function (response) {
            res.send(response.data)
            // zlib.gunzip(response.data, function (_err, output) {
            //   res.send(output);
            // });
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
