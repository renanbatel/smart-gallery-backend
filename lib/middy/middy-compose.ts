import middy, { MiddlewareObject } from 'middy';

export function middyCompose() {
  const allMiddlewares: Array<MiddlewareObject<any, any>> = [];
  const instance = (handler): middy.Middy<any, any> => {
    const middyInstance = middy(handler);

    for (const middleware of allMiddlewares) {
      middyInstance.use(middleware);
    }

    return middyInstance;
  };

  instance.use = (...middlewares: Array<MiddlewareObject<any, any>>) => {
    for (const middleware of middlewares) {
      if (Array.isArray(middleware)) {
        allMiddlewares.push(...middleware);
      } else {
        allMiddlewares.push(middleware);
      }
    }

    return instance;
  };

  return instance;
}
