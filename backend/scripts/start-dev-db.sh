#!/bin/bash
set -e

if command -v docker-compose &> /dev/null; then
  docker-compose -f db/development_db.yml up -d
elif docker compose &> /dev/null; then
  docker compose -f db/development_db.yml up -d
else
  echo "Error: Neither 'docker-compose' nor 'docker compose' commands are available."
  exit 1
fi

