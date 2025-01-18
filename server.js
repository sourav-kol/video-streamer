var express = require('express');
var server = express();

const { getAllS3Buckets } = require('./aws/aws-operations')

var port = process.env.PORT || 5000;

//cors - FE 

//middlewares

//routes

server.listen(port, () => {
    console.log(`server running on port ${port}`);
    console.log(getAllS3Buckets());
});
