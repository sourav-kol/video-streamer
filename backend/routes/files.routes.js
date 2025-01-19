const { express } = require('.');
var router = express.Router();
const { start, upload, complete } = require('.././controller/file.controller');

// router.get("/signed/upload-url", async (req, res) => {
//     var url = "";
//     await addFile()
//     .then((res) => {
//         url = res;
//     });
//     res.status(200).send(url);
// })

router.post("/upload/start", async (req, res) => {
    const { fileName, fileType } = req.body;
    var response = "";
    await start(fileName, fileType)
        .then((res) => {
            response = res;
        });
    res.status(200).send(response);
})

router.put("/upload", async (req, res) => {
    const { fileName, partNumber, uploadId, fileChunk } = req.body;
    var response = "";
    await upload(fileName, partNumber, uploadId, fileChunk)
        .then((res) => {
            response = res;
        });
    res.status(200).send(response);
})

router.post("upload/complete", async (req, res) => {
    const { fileName, uploadId, parts } = req.body;
    var response = "";
    await complete(fileName, uploadId, parts)
        .then((res) => {
            response = res;
        });
    res.status(200).send(response);
})

module.exports = router;



