const { express } = require('.');
var router = express.Router();
const { addFile } = require('.././controller/file.controller');

router.get("/", async (req, res) => {
    var url = "";
    await addFile()
    .then((res) => {
        console.log("url:  \n ",res);
        url = res;
    });
    res.status(200).send(url);
})

router.put("/upload", (req, res) => {
    res.send("file upload");
})

module.exports = router;



