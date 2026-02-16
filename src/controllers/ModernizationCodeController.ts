import { Request, Response } from "express";
import { ModernizationCodeService } from "../services/ModernizationCodeService";

export class ModernizationCodeController {
    constructor(private modernizationCodeService: ModernizationCodeService) {}

    /**
     * Endpoint para migração de dados legados
     */
    public async migrateLegacyData(req: Request, res: Response): Promise<void> {
        try {
            await this.modernizationCodeService.migrateLegacyData(req.body);
            res.status(200).json({ message: "Legacy data migration completed successfully." });
        } catch (error) {
            res.status(500).json({ error: "An error occurred during legacy data migration." });
        }
    }

    /**
     * Endpoint para armazenamento de arquivos
     */
    public async storeFile(req: Request, res: Response): Promise<void> {
        try {
            // Para simplificação, assumindo que o arquivo vem em req.body.file
            await this.modernizationCodeService.storeModernizationFile(req.body.file);
            res.status(200).json({ message: "File stored successfully." });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while storing the file." });
        }
    }

    /**
     * Endpoint para comunicação com bibliotecas SAI
     */
    public async communicateWithSAI(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.modernizationCodeService.communicateWithSAI(req.body);
            res.status(200).json({ message: "Communication with SAI successful", data: result });
        } catch (error) {
            res.status(500).json({ error: "An error occurred during communication with SAI." });
        }
    }

    /**
     * Endpoint para processar operação com contexto de requisição
     */
    public async processRequest(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.modernizationCodeService.processRequestWithContext(async () => {
                // Executa a lógica de negócio conforme necessário
                return { message: "Processed with context" };
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "An error occurred processing the request." });
        }
    }
}
