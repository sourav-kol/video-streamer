const { server } = require('./routes');
const fileRouter = require('./routes/files.routes');

var port = process.env.PORT || 5000;

//cors - FE 

//middlewares

//routes
server.use("/file", fileRouter);

server.use("/", (req, res) => {
    res.send("No Home Page!!!");
});


server.listen(port, () => {
    console.log(`server running on port ${port}`);
});
