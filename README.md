# nodejs-suggestions-api
###### How to run the project
1. docker-compose up
2. npm i
3. node server.js
4. ```Sample GET request : localhost:5000/suggestions?q=lond&latitude=43.70011&longitude=-79.4163&radius=300&sort=distance```

```
{
    "suggestions": [
        {
            "_id": "625b818eeafb0d39883f573e",
            "name": "London",
            "lat": "42.98339",
            "long": "-81.23304",
            "distance": 167.1359228471241
        },
        {
            "_id": "625b818feafb0d39883f5f6f",
            "name": "London",
            "lat": "39.88645",
            "long": "-83.44825",
            "distance": 539.8083529632808
        },
        {
            "_id": "625b818eeafb0d39883f5d40",
            "name": "Londontowne",
            "lat": "38.93345",
            "long": "-76.54941",
            "distance": 581.4992888747269
        }
    ],
    "status": 200,
    "noOfSuggestions": 3
}
```

