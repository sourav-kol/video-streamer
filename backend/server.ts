import { server, express } from './routes';
import { fileRouter } from './routes/files.routes';
import cors from 'cors';

var port = process.env.PORT || 3000;

// server.use(express.json());
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));

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
