import { express } from './index';
import { startUpload, uploadFilePart, completeUpload } from '.././controller/file.controller';

var fileRouter = express.Router();

fileRouter.post("/upload/start", startUpload);

fileRouter.post("/upload", uploadFilePart);

fileRouter.post("/upload/complete", completeUpload);

export { fileRouter };



