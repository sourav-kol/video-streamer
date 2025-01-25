import { getMultipartSignedUrls } from '../aws/aws-operations';

const getSignedUrls = async (key:string, totalParts:number, fileType:string) => {
    var url = await getMultipartSignedUrls(key, totalParts, fileType);
    return url;
}

export { getSignedUrls }
