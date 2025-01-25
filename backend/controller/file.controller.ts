import { Request, Response } from 'express';
import { startFileUpload, completeMultipartUpload, uploadPart } from '.././service/file.service';

const startUpload = async (req: Request, res: Response) => {
    const { key, fileType } = req.body;
    var result = await startFileUpload(key, fileType);
    res.status(200).send(result);
}

const uploadFilePart = async (req: Request, res: Response) => {
    const { key, partNumber, fileType, uploadId, chunk } = req.body;
    var result = await uploadPart(key, partNumber, fileType, uploadId, chunk);
    res.status(200).send(result);
}

const completeUpload = async (req: Request, res: Response) => {
    const { key, uploadId, parts } = req.body;
    await completeMultipartUpload(key, uploadId, parts);
    res.status(200).send("complete!!");
}

export { startUpload, uploadFilePart, completeUpload }