#!/bin/bash

cd $(dirname $0)/..

migrationName=${1:-migration}
type=${2:-ts}

if [ "$type" != "ts" -a "$type" != "sql" ]; then
  echo "Type must be ts or sql"
  exit 1
fi

migrationDir=src/migrations
templateFile=.db-migrate/templates/$type-migration.ts
ts=$(date +%Y%m%d%H%M%S)
migrationFullName=${ts}-${migrationName}

mkdir -p $migrationDir
cp -f $templateFile $migrationDir/$migrationFullName.ts

if [ "$type" = "sql" ]; then
  mkdir -p $migrationDir/sql
  touch $migrationDir/sql/$migrationFullName-{up,down}.sql
fi

echo "Migration $migrationFullName created!"
