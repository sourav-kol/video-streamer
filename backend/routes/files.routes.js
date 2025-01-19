const { express } = require('.');
var router = express.Router();
const { getMultipartSignedUrls } = require('.././controller/file.controller');

router.post("/signed/urls", async (req, res) => {
    const {key, uploadId, totalParts, fileType} = req.body;
    var signedUrls = [];
    await getMultipartSignedUrls(key, uploadId, totalParts, fileType)
    .then((res) => {
        console.log("url:  \n ",res);
        signedUrls = res;
    });
    res.status(200).send(signedUrls);
});

// router.put("/upload", (req, res) => {
//     res.send("file upload");
// })

module.exports = router;



