import { Connection, createConnection, EntitySchema, Repository } from 'typeorm';

import { Image } from '../../../src/models';

const config = {
  type: 'mysql',
  entities: [Image],
  bigNumberStrings: false,
  timezone: 'UTC',
  connectionTimeout: 2000,
  acquireTimeout: 2000,
};

if (process.env.NODE_ENV === 'production') {
  // TODO
} else {
  Object.assign(config, {
    host: 'localhost',
    port: 3306,
    username: 'smartgallery',
    password: 'smartgallery',
    database: 'smartgallery_development',
    synchronize: false,
  });
}

let singletonConnection: Connection | undefined;

export async function getDatabaseConnection(customConfig?): Promise<Connection> {
  if (singletonConnection && singletonConnection.isConnected) {
    return singletonConnection;
  }

  singletonConnection = await createConnection({ ...config, ...customConfig });

  return singletonConnection;
}

export async function getRepository<T>(target: string | Function | (new () => T) | EntitySchema<T>): Promise<Repository<T>> {
  const connection = await getDatabaseConnection();

  return connection.getRepository(target);
}
