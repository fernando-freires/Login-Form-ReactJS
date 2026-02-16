export interface IServiceScope {
    // Simulate a service scope with a disposal method
    dispose(): void;
}

export interface IServiceScopeFactory {
    createScope(): IServiceScope;
}
