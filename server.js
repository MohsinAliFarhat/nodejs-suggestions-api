const express = require('express');
const app = express();
const PORT = 5000;
require("./mongo-connection/mongo-connection");
const routes =require("./routes/index");

routes(app)

app.listen(PORT,()=>{
    console.log(`Listeneing at ${PORT}`)
})