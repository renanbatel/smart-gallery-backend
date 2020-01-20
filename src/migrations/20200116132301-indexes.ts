import { MigrateDatabase } from '../../lib/db';

export function up(db: MigrateDatabase) {
  return db.runSql('CREATE INDEX ix_image_userId ON image (userId)');
}

export function down(db: MigrateDatabase) {
  return db.runSql('DROP INDEX ix_image_userId ON image');
}
