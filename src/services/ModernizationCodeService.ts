import { IModernizationService } from "../interfaces/IModernizationService";
import { IModernizationFileRepository } from "../interfaces/IModernizationFileRepository";
import { ISAILibraryService } from "../interfaces/ISAILibraryService";
import { ISAILibraryTokenProvider } from "../interfaces/ISAILibraryTokenProvider";
import { SAILibraryAPIOptions } from "../config/SAILibraryAPIOptions";
import { IBlobStorage } from "../interfaces/IBlobStorage";
import { IHttpContextAccessor } from "../interfaces/IHttpContextAccessor";
import { IServiceScopeFactory } from "../interfaces/IServiceScopeFactory";
import { Logger } from "../utils/Logger";

export class ModernizationCodeService {
    constructor(
        private modernizationService: IModernizationService,
        private fileRepository: IModernizationFileRepository,
        private saiLibraryService: ISAILibraryService,
        private saiLibraryTokenProvider: ISAILibraryTokenProvider,
        private saiLibraryAPIOptions: SAILibraryAPIOptions,
        private blobStorage: IBlobStorage,
        private httpContextAccessor: IHttpContextAccessor,
        private serviceScopeFactory: IServiceScopeFactory,
        private logger: Logger
    ) {}

    /**
     * Integração com Serviço de Modernização
     * Cenário 01: Atualiza dados legados
     */
    public async migrateLegacyData(data: any): Promise<void> {
        try {
            this.logger.info("Starting legacy data migration.");
            await this.modernizationService.updateLegacyData(data);
            this.logger.info("Legacy data migration completed successfully.");
        } catch (error) {
            this.logger.error("Error during legacy data migration", error);
            throw error;
        }
    }

    /**
     * Armazenamento de Arquivos de Modernização
     * Cenário 02: Grava ou recupera arquivos
     */
    public async storeModernizationFile(file: any): Promise<void> {
        try {
            this.logger.info("Storing modernization file.");
            await this.fileRepository.storeFile(file);
            this.logger.info("File stored successfully.");
        } catch (error) {
            this.logger.error("Error storing modernization file", error);
            throw error;
        }
    }

    public async retrieveModernizationFile(id: string): Promise<any> {
        try {
            this.logger.info(`Retrieving modernization file with id: ${id}`);
            const file = await this.fileRepository.retrieveFile(id);
            this.logger.info("File retrieval successful.");
            return file;
        } catch (error) {
            this.logger.error("Error retrieving modernization file", error);
            throw error;
        }
    }

    /**
     * Comunicação com Bibliotecas SAI
     * Cenário 03: Obtém token e executa ação via API externa
     */
    public async communicateWithSAI(data: any): Promise<any> {
        try {
            this.logger.info("Starting communication with SAI.");
            const token = await this.saiLibraryTokenProvider.getToken();
            this.logger.info("Obtained token from SAI library token provider.");
            // Uso das configurações da API, se necessário: this.saiLibraryAPIOptions
            const result = await this.saiLibraryService.callExternalAPI(token, data);
            this.logger.info("Communication with SAI completed successfully.");
            return result;
        } catch (error) {
            this.logger.error("Error during communication with SAI", error);
            throw error;
        }
    }

    /**
     * Armazenamento em Nuvem via BlobStorage
     */
    public async uploadToBlobStorage(blob: Buffer, fileName: string): Promise<void> {
        try {
            this.logger.info("Uploading file to blob storage.");
            await this.blobStorage.upload(blob, fileName);
            this.logger.info("File uploaded to blob storage successfully.");
        } catch (error) {
            this.logger.error("Error uploading file to blob storage", error);
            throw error;
        }
    }

    /**
     * Suporte a Escopos e Contexto da Requisição
     * Cenário 04: Utiliza IHttpContextAccessor e cria novos escopos
     */
    public async processRequestWithContext(operation: () => Promise<any>): Promise<any> {
        const context = this.httpContextAccessor.getContext();
        this.logger.info(`Processing request for user: ${context.user?.id || 'unknown'}`);
        const scope = this.serviceScopeFactory.createScope();
        try {
            const result = await operation();
            this.logger.info("Operation within request context completed successfully.");
            return result;
        } catch (error) {
            this.logger.error("Error during operation in request context", error);
            throw error;
        } finally {
            scope.dispose();
        }
    }
}
