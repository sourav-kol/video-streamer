import { Request, Response } from 'express';
import { getSignedUrls, completeMultipartUpload } from '.././service/file.service';

const getMultipartSignedUrls = async (req: Request, res: Response) => {
    const { key, totalParts, fileType } = req.body;

    var result = await getSignedUrls(key, totalParts, fileType);

    res.status(200).send(result);
}

const completeUpload = async (req: Request, res: Response) => {
    const { key, uploadId, parts } = req.body;
    await completeMultipartUpload(key, uploadId, parts);
    res.status(200).send("complete!!");
}

export { getMultipartSignedUrls, completeUpload }