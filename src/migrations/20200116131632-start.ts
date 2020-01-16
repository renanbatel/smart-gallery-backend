import { MigrateDatabase, migrateRunSql, MigrateType } from '../../lib/db';

export function up(db: MigrateDatabase) {
  return migrateRunSql(__filename, db, MigrateType.UP);
}

export function down(db: MigrateDatabase) {
  return migrateRunSql(__filename, db, MigrateType.DOWN);
}
