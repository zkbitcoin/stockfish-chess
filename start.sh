#!/bin/bash

# Check if a config file is provided as a parameter, otherwise use the default
#CONFIG_FILE=${1:-docker-compose.yml}

# Check if the provided config file exists
#if [ ! -f "$CONFIG_FILE" ]; then
#  echo "Error: Config file '$CONFIG_FILE' not found!"
#  exit 1
#fi

# Bring down any existing containers
#docker-compose -f "$CONFIG_FILE" down

# Start the containers in detached mode using the specified config file
#docker-compose -f "$CONFIG_FILE" up -d


export PYTHONPATH=./server
export DATABASE_URL="postgresql://postgres:password@postgres:5432/postgres"
export REDIS_URL="redis://0.0.0.0:6379"

source server/.venv/bin/activate

python server/app/main.py > /dev/null 2>&1
