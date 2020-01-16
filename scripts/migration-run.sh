#!/bin/bash

cd $(dirname $0)/..

# TODO: production migration
# if [ "$1" = "--production" ]; then

  # shift

  # if [ -z "$GITHUB_REF" ]; then
  #   echo "Not running on Github Actions!"
  #   exit 1
  # fi

  # REF=$(echo "$GITHUB_REF" | rev | cut -d/ -f1 | rev)

  # echo "REF=$REF"

  # function getExport() {
  #   aws cloudformation list-exports --query "Exports[?Name=='${1}-${REF}'].Value" --output text
  # }

  # export STAGE=production
  # export DATABASE_HOST=$(getExport aurora-host)
  # export DATABASE_PORT=$(getExport aurora-port)
  # export DATABASE_USERNAME=$(getExport aurora-username)
  # export DATABASE_PASSWORD=$(getExport aurora-password)
  # export DATABASE_NAME=$(getExport aurora-database)

  # echo "DATABASE_HOST=$DATABASE_HOST"
  # echo "DATABASE_PORT=$DATABASE_PORT"
  # echo "DATABASE_USERNAME=$DATABASE_USERNAME"
  # echo "DATABASE_PASSWORD=*****"
  # echo "DATABASE_NAME=$DATABASE_NAME"
# else
  export STAGE=development
# fi

echo "STAGE=$STAGE"
echo

action=$1

db-migrate $action \
  --env ${STAGE} \
  --config .db-migrate/config.json \
  --migrations-dir src/migrations \
  --migration-table migrations
