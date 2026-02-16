export interface ISAILibraryTokenProvider {
    getToken(): Promise<string>;
}
