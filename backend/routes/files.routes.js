const { express } = require('./index');
var router = express.Router();
const { getMultipartSignedUrls } = require('.././controller/file.controller');

router.post("/signed/urls", getMultipartSignedUrls);

module.exports = router;



