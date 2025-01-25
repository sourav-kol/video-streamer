import { Request, Response } from 'express';
import { getSignedUrls } from '.././service/file.service';

const getMultipartSignedUrls = async (req: Request, res: Response) => {
    const { key, totalParts, fileType } = req.body;

    var result = await getSignedUrls(key, totalParts, fileType);

    res.status(200).send(result);
}

export { getMultipartSignedUrls }