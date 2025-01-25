import { express } from './index';
import { getMultipartSignedUrls } from '.././controller/file.controller';

var fileRouter = express.Router();

fileRouter.post("/signed/urls", getMultipartSignedUrls);

export { fileRouter };



