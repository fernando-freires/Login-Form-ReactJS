export interface IModernizationService {
    updateLegacyData(data: any): Promise<void>;
}
