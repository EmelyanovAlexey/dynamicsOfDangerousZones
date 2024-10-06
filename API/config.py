from dotenv import load_dotenv
import os


load_dotenv()

DB_USER=os.environ.get("DB_USER")
DB_PASS=os.environ.get("DB_PASS")
DB_HOST=os.environ.get("DB_HOST")
DB_POST=os.environ.get("DB_POST")
DB_NAME=os.environ.get("DB_NAME")

DATABASE_URL = "postgresql+asyncpg://postgres:1111@localhost:5432/Leason"