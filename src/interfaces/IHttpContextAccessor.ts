export interface IHttpContext {
    user: any;
    headers: any;
}

export interface IHttpContextAccessor {
    getContext(): IHttpContext;
}
