import { MigrateDatabase } from '../../lib/db';

export function up(db: MigrateDatabase) {
  return db.runSql('CREATE INDEX ix_images_userId ON images (userId)');
}

export function down(db: MigrateDatabase) {
  return db.runSql('DROP INDEX ix_images_userId ON images');
}
