const { server, express } = require('./routes');
const fileRouter = require('./routes/files.routes');
var cors = require('cors')


var port = process.env.PORT || 5000;

server.use(express.json());
//cors - FE 
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
server.use(cors(corsOptions));
//middlewares

//routes
server.use("/file", fileRouter);

server.use("/", (req, res) => {
  res.status(404).send("Not Found");
});


server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
