
export PYTHONPATH=.
export DATABASE_URL="postgresql://postgres:password@postgres:5432/postgres"
export REDIS_URL="redis://localhost:6379/0"

python app/main.py
