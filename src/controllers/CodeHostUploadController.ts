import { Request, Response } from 'express';
import { toDomain } from "../extensions/CodeHostUploadRequestExtensions";
import { CodeHostUploadRequest } from "../models/CodeHostUploadRequest";

export class CodeHostUploadController {
  // Este método recebe a requisição, converte para o objeto de domínio e retorna o resultado
  upload(req: Request, res: Response): void {
    try {
      const requestBody: CodeHostUploadRequest = req.body;
      const domainObject = toDomain(requestBody);
      res.status(200).json(domainObject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
