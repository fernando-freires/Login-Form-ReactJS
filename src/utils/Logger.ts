export class Logger {
    info(message: string, ...optionalParams: any[]): void {
        console.log("INFO:", message, ...optionalParams);
    }
    error(message: string, ...optionalParams: any[]): void {
        console.error("ERROR:", message, ...optionalParams);
    }
}
