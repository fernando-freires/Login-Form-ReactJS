export interface IBlobStorage {
    upload(blob: Buffer, fileName: string): Promise<void>;
    download(fileIdentifier: string): Promise<Buffer>;
}
