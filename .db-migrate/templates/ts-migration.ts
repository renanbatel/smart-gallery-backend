import { MigrateDatabase } from '../../lib/db';

export function up(db: MigrateDatabase) {
  return db.runSql('');
}

export function down(db: MigrateDatabase) {
  return db.runSql('');
}
