import "reflect-metadata";
import { Container } from "inversify";
import { ModernizationCodeService } from "./services/ModernizationCodeService";
import { ModernizationCodeController } from "./controllers/ModernizationCodeController";
import { Logger } from "./utils/Logger";

// Interfaces and their dummy implementations for demonstration purposes
import { IModernizationService } from "./interfaces/IModernizationService";
import { IModernizationFileRepository } from "./interfaces/IModernizationFileRepository";
import { ISAILibraryService } from "./interfaces/ISAILibraryService";
import { ISAILibraryTokenProvider } from "./interfaces/ISAILibraryTokenProvider";
import { SAILibraryAPIOptions } from "./config/SAILibraryAPIOptions";
import { IBlobStorage } from "./interfaces/IBlobStorage";
import { IHttpContextAccessor } from "./interfaces/IHttpContextAccessor";
import { IServiceScopeFactory, IServiceScope } from "./interfaces/IServiceScopeFactory";

// Dummy implementation of IModernizationService
class ModernizationService implements IModernizationService {
    async updateLegacyData(data: any): Promise<void> {
        console.log("Dummy: Updating legacy data with", data);
    }
}

// Dummy implementation of IModernizationFileRepository
class ModernizationFileRepository implements IModernizationFileRepository {
    async storeFile(file: any): Promise<void> {
        console.log("Dummy: Storing file", file);
    }
    async retrieveFile(id: string): Promise<any> {
        console.log("Dummy: Retrieving file with id", id);
        return { id, file: "dummy content" };
    }
}

// Dummy implementation of ISAILibraryService
class SAILibraryServiceImpl implements ISAILibraryService {
    async callExternalAPI(token: string, data: any): Promise<any> {
        console.log("Dummy: Calling external API with token:", token, "and data:", data);
        return { success: true };
    }
}

// Dummy implementation of ISAILibraryTokenProvider
class SAILibraryTokenProviderImpl implements ISAILibraryTokenProvider {
    async getToken(): Promise<string> {
        console.log("Dummy: Providing token");
        return "dummy-token";
    }
}

// Dummy implementation of IBlobStorage
class BlobStorageImpl implements IBlobStorage {
    async upload(blob: Buffer, fileName: string): Promise<void> {
        console.log("Dummy: Uploading blob with fileName:", fileName);
    }
    async download(fileIdentifier: string): Promise<Buffer> {
        console.log("Dummy: Downloading blob with identifier:", fileIdentifier);
        return Buffer.from("dummy data");
    }
}

// Dummy implementation of IHttpContextAccessor
class HttpContextAccessorImpl implements IHttpContextAccessor {
    getContext() {
        return {
            user: { id: 1, name: "Dummy User" },
            headers: { authorization: "Bearer dummy" }
        };
    }
}

// Dummy implementations for IServiceScopeFactory
class ServiceScope implements IServiceScope {
    dispose(): void {
        console.log("Dummy: Disposing service scope.");
    }
}

class ServiceScopeFactoryImpl implements IServiceScopeFactory {
    createScope(): IServiceScope {
        return new ServiceScope();
    }
}

const container = new Container();

container.bind<IModernizationService>("IModernizationService").to(ModernizationService);
container.bind<IModernizationFileRepository>("IModernizationFileRepository").to(ModernizationFileRepository);
container.bind<ISAILibraryService>("ISAILibraryService").to(SAILibraryServiceImpl);
container.bind<ISAILibraryTokenProvider>("ISAILibraryTokenProvider").to(SAILibraryTokenProviderImpl);
container.bind<SAILibraryAPIOptions>("SAILibraryAPIOptions").toConstantValue({
    baseUrl: "https://sai.example.com/api",
    clientId: "dummyClientId",
    clientSecret: "dummyClientSecret"
});
container.bind<IBlobStorage>("IBlobStorage").to(BlobStorageImpl);
container.bind<IHttpContextAccessor>("IHttpContextAccessor").to(HttpContextAccessorImpl);
container.bind<IServiceScopeFactory>("IServiceScopeFactory").to(ServiceScopeFactoryImpl);
container.bind<Logger>("Logger").to(Logger);

container.bind(ModernizationCodeService).toSelf();
container.bind(ModernizationCodeController).toSelf();

export { container };
