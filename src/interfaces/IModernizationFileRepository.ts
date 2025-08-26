export interface IModernizationFileRepository {
    storeFile(file: any): Promise<void>;
    retrieveFile(id: string): Promise<any>;
}
