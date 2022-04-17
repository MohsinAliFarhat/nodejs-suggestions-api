const express = require("express");
const router = express.Router();
const CITY = require('../../mongoose-models/city')

router.get('', async (req, res, next) => {
  console.log(`Request recieved with params: ${JSON.stringify(req.query)}`)
  
  //Filter object preparation
  const searchObj = {};
  searchObj.name = req.query.q ? req.query.q : ''
  searchObj.name = new RegExp(`${searchObj.name}`, "i")
  searchObj.latitude = req.query.latitude ? parseFloat(req.query.latitude) : 0
  searchObj.longitude = req.query.longitude ? parseFloat(req.query.longitude) : 0
  searchObj.radius = req.query.radius ? parseFloat(req.query.radius) : 0
  
  if (req.query.sort && req.query.sort == "name") {
    searchObj.sort = { $sort: { name: 1 } }
  } else {
    searchObj.sort = { $sort: { distance: 1 } }
  }

  //PipeLine Preparation for custom results
  const pipeline = [
    {
      $match: { name: searchObj.name }
    },
    {
      $addFields:
      {
        distance:
        {
          $function:
          {
            body: function (lat1, lon1, lat2, lon2) {
              var p = 0.017453292519943295;    // Math.PI / 180
              var c = Math.cos;
              var a = 0.5 - c((lat2 - lat1) * p) / 2 +
                c(lat1 * p) * c(lat2 * p) *
                (1 - c((lon2 - lon1) * p)) / 2;

              return 12742 * Math.asin(Math.sqrt(a))
            },
            args: ["$lat", "$long", searchObj.latitude, searchObj.longitude],
            lang: "js"
          }

        }
      }
    },
    {
      $addFields:
      {
        radius:
        {
          $function:
          {
            body: function (distance) {
              return distance / 2
            },
            args: ["$distance"],
            lang: "js"
          }
        }
      }
    },
    { $match: { radius: { $lt: searchObj.radius } } },
    searchObj.sort,
    { $project: { name: 1, lat: 1, long: 1, distance: 1 } },
  ]

  const data = await CITY.aggregate(pipeline);
  res.status(200).send(
    {
      suggestions: data,
      status: 200,
      noOfSuggestions: data.length
    })
})

module.exports = router;