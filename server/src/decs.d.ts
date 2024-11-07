declare module 'koa-bodyparser' {
  import { Middleware } from 'koa';

  function bodyParser(options?: any): Middleware;
  export default bodyParser;
}

declare module 'koa-router' {
  import { Middleware } from 'koa';

  interface RouterOptions {
    prefix?: string;
  }

 class Router {
    constructor(options?: RouterOptions);
    get(path: string, ...handlers: Middleware[]): Router;
    post(path: string, ...handlers: Middleware[]): Router;
    put(path: string, ...handlers: Middleware[]): Router; // Added `put` method
    delete(path: string, ...handlers: Middleware[]): Router; // Added `delete` method
    // Add other HTTP methods as needed
    prefix(prefix: string): Router; // Added `prefix` method
    routes(): Middleware;
    allowedMethods(): Middleware;
  }

  export default Router;
}