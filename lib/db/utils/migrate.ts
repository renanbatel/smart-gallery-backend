import { readFileSync } from 'fs';
import path from 'path';

import { MigrateDatabase, MigrateType } from './types';

export async function migrateRunSql(filename: string, db: MigrateDatabase, type: MigrateType) {
  const parsedFilename = path.parse(filename);
  const sqlFile = path.join(parsedFilename.dir, 'sql', `${parsedFilename.name}-${type}.sql`);
  const content = readFileSync(sqlFile).toString();

  return db.runSql(content);
}
