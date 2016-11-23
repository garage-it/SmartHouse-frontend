

declare var ENV_PUBLIC_CONFIG: {
    backEndWebSocketUrl: string,
    backEndUrl: string,
    localStorageTokenKey: string
};

interface WebpackRequire {
    (id: string): any;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure(ids: string[], callback: (req: WebpackRequire) => void, chunkName?: string): void;
    context(directory: string, useSubDirectories?: boolean, regExp?: RegExp): WebpackContext;
}

interface WebpackContext extends WebpackRequire {
    keys(): string[];
}

interface ErrorStackTraceLimit {
    stackTraceLimit: number;
}

interface NodeRequire extends WebpackRequire {}

declare namespace jasmine {

    // tslint:disable-next-line
    function createSpyComponent(...args): any // tslint:disable-next-line
}
