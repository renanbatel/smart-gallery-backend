// Type definitions for db-migrate-base
// Project: https://github.com/db-migrate/db-migrate-base
// Definitions by: nickiannone <https://github.com/nickiannone>
// Definitions: https://github.com/nickiannone/DefinitelyTyped
// TypeScript Version: 3.2

/// <reference types="node"/>

import * as Promise from 'bluebird';

export type CallbackFunction = (err: any, response: any) => void;

export interface InternalModule {
  log: any;
  type: any;
}

export interface InternalOptions {
  mod: InternalModule;
}

export interface ColumnSpec {
  length?: number;
  type: string;
  unsigned?: boolean;
  primaryKey?: boolean;
  autoIncrement?: boolean;
  notNull?: boolean;
  unique?: boolean;
  defaultValue?: any;
  foreignKey?: ForeignKeySpec;
}

export interface ForeignKeySpec {
  name: string;
  table: string;
  rules?: ForeignKeyRules;
  mapping: string | any;
}

export interface ForeignKeyRules {
  onDelete: string;
  onUpdate: string;
}

export interface RemoveForeignKeyOptions {
  dropIndex?: boolean;
}

export interface ColumnDef {
  foreignKey?: any; // TODO Figure this out!
  constraints: string;
}

export interface CreateTableOptions {
  columns?: ColumnSpec[];
  ifNotExists?: boolean;
}

export interface DropTableOptions {
  ifExists?: boolean;
}

export declare class MigrateDatabase {
  constructor(intern: InternalOptions);

  internals: any;

  close(): Promise<any>;
  close(callback?: CallbackFunction): void;

  mapDataType(str: string): string;

  truncate(tableName: string): Promise<any>;
  truncate(tableName: string, callback: CallbackFunction): void;

  checkDBMS(dbms: any): Promise<any>;
  checkDBMS(dbms: any, callback: CallbackFunction): void;

  createDatabase(...options: any[]): Promise<any>;
  createDatabase(...options: any[]): void;

  switchDatabase(...options: any[]): Promise<any>;
  switchDatabase(...options: any[]): void;

  dropDatabase(...options: any[]): Promise<any>;
  dropDatabase(...options: any[]): void;

  recurseCallbackArray(foreignKeys: string[]): Promise<any>;
  recurseCallbackArray(foreignKeys: string[], callback: CallbackFunction): void;

  bindForeignKey(tableName: string, columnName: string, fkOptions: ForeignKeySpec): (callback: CallbackFunction) => void;

  createColumnDef(name: string, spec: ColumnSpec, options?: any): ColumnDef; // TODO Figure out a type for `options`!

  // createColumnConstraint(spec: ColumnSpec, options?: any, ...implementationDefinedOptions: any[]): string;

  createMigrationsTable(): Promise<any>;
  createMigrationsTable(callback: CallbackFunction): void;

  createSeedsTable(): Promise<any>;
  createSeedsTable(callback: CallbackFunction): void;

  createTable(tableName: string, options: any | CreateTableOptions): Promise<any>;
  createTable(tableName: string, options: any | CreateTableOptions, callback: CallbackFunction): void;

  dropTable(tableName: string, options?: DropTableOptions): Promise<any>;
  dropTable(tableName: string, optionsOrCb?: DropTableOptions | CallbackFunction, callback?: CallbackFunction): void;

  renameTable(tableName: string, newTableName: string): Promise<any>;
  renameTable(tableName: string, newTableName: string, callback: CallbackFunction): void;

  addColumn(tableName: string, columnName: string, columnSpec: ColumnSpec): Promise<any>;
  addColumn(tableName: string, columnName: string, columnSpec: ColumnSpec, callback: CallbackFunction): void;

  removeColumn(tableName: string, columnName: string): Promise<any>;
  removeColumn(tableName: string, columnName: string, callback: CallbackFunction): void;

  renameColumn(tableName: string, oldColumnName: string, newColumnName: string): Promise<any>;
  renameColumn(tableName: string, oldColumnName: string, newColumnName: string, callback: CallbackFunction): void;

  changeColumn(tableName: string, columnName: string, columnSpec: ColumnSpec): Promise<any>;
  changeColumn(tableName: string, columnName: string, columnSpec: ColumnSpec, callback: CallbackFunction): void;

  quoteDDLArr(arr: string[]): string[];

  quoteArr(arr: string[]): string[];

  addIndex(tableName: string, indexName: string, columns: string | string[], unique?: boolean): Promise<any>;
  addIndex(
    tableName: string,
    indexName: string,
    columns: string | string[],
    uniqueOrCb?: boolean | CallbackFunction,
    callback?: CallbackFunction,
  ): void;

  insert(tableName: string, columnNameOrValueArray: any, valueArrayOrCb?: any | CallbackFunction, callback?: CallbackFunction): Promise<any>;
  insert(tableName: string, columnNameOrValueArray: any, valueArrayOrCb?: any | CallbackFunction, callback?: CallbackFunction): void;

  update(
    tableName: string,
    columnNameOrValueArray: any,
    valueArrayOrIds?: any,
    idsOrCb?: any | CallbackFunction,
    callback?: CallbackFunction,
  ): Promise<any>;
  update(tableName: string, columnNameOrValueArray: any, valueArrayOrIds?: any, idsOrCb?: any | CallbackFunction, callback?: CallbackFunction): void;

  lookup(tableName: string, column: string, id?: any, callback?: CallbackFunction): Promise<any>;
  lookup(tableName: string, column: string, id?: any, callback?: CallbackFunction): void;

  removeIndex(tableNameOrIndexName: string, indexName?: string): Promise<any>;
  removeIndex(tableNameOrIndexName: string, indexNameOrCb?: string | CallbackFunction, callback?: CallbackFunction): void;

  addForeignKey(tableName: string, referencedTableName: string, keyName: string, fieldMapping: any, rules: ForeignKeyRules): Promise<any>;
  addForeignKey(
    tableName: string,
    referencedTableName: string,
    keyName: string,
    fieldMapping: any,
    rules: ForeignKeyRules,
    callback: CallbackFunction,
  ): void;

  removeForeignKey(tableName: string, keyName: string, options?: RemoveForeignKeyOptions): Promise<any>;
  removeForeignKey(tableName: string, keyName: string, optionsOrCb?: RemoveForeignKeyOptions | CallbackFunction, callback?: CallbackFunction): void;

  normalizeColumnSpec(spec: string | ColumnSpec): ColumnSpec;

  addMigrationRecord(name: string): Promise<any>;
  addMigrationRecord(name: string, callback: CallbackFunction): void;

  addSeedRecord(name: string): Promise<any>;
  addSeedRecord(name: string, callback: CallbackFunction): void;

  startMigration(): Promise<any>;
  startMigration(callback: CallbackFunction): void;

  endMigration(callback: CallbackFunction): Promise<any>;
  endMigration(callback: CallbackFunction): void;

  runSql(sql?: string, params?: any[]): Promise<any>;
  runSql(sql?: string, paramsOrCb?: any[] | CallbackFunction, callback?: CallbackFunction): void;

  allLoadedMigrations(): Promise<any>;
  allLoadedMigrations(callback: CallbackFunction): void;

  allLoadedSeeds(): Promise<any>;
  allLoadedSeeds(callback: CallbackFunction): void;

  deleteMigration(migrationName: string): Promise<any>;
  deleteMigration(migrationName: string, callback: CallbackFunction): void;

  remove(table: string, ids: any): Promise<any>;
  remove(table: string, ids: any, callback: CallbackFunction): void; // TODO Make ids match the type of ids in buildWhereClause(ids);

  buildWhereClause(ids: any): string;

  deleteSeed(seedName: string): Promise<any>;
  deleteSeed(seedName: string, callback: CallbackFunction): void;

  all(sql: string, params?: any[]): Promise<any>;
  all(sql: string, paramsOrCb?: any[] | CallbackFunction, callback?: CallbackFunction): void;

  escape(str: string): string;

  escapeString(str: string): string;

  escapeDDL(str: string): string;
}
