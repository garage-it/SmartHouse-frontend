/* tslint:disable:no-unused-function */

declare var ENV_PUBLIC_CONFIG: {
    backEndWebSocketUrl: string,
    backEndUrl: string
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
    function createSpyComponent(...args): any
}
