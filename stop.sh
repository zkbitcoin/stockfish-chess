#!/bin/bash

# docker system prune -a -f --volumes

# Check if a config file is provided as a parameter, otherwise use the default
CONFIG_FILE=${1:-docker-compose.yml}

# Check if the provided config file exists
if [ ! -f "$CONFIG_FILE" ]; then
  echo "Error: Config file '$CONFIG_FILE' not found!"
  exit 1
fi

# Bring down any existing containers
docker-compose -f "$CONFIG_FILE" down

