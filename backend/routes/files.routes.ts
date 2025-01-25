import { express } from './index';
import { getMultipartSignedUrls, completeUpload } from '.././controller/file.controller';

var fileRouter = express.Router();

fileRouter.post("/signed/urls", getMultipartSignedUrls);

fileRouter.post("/upload/complete", completeUpload);

export { fileRouter };



