export interface ISAILibraryService {
    callExternalAPI(token: string, data: any): Promise<any>;
}
