var express = require('express');
var server = express();

var port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
