#!/bin/bash

export PYTHONPATH=.
export DATABASE_URL="postgresql://postgres:password@postgres:5432/postgres"
export REDIS_URL="redis://localhost:6379/0"

# Check for any lingering processes
if lsof -i :8888; then
  echo "A process is still using the port. Killing it..."
  kill -9 $(lsof -t -i:8888)
fi


python app/main.py
