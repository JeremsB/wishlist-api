const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let cors = require('cors')

app.use(cors()) // Use this after the variable declaration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

require('./routes')(app);

const PORT = 3456;
app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})
