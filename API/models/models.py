from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP

metadata = MetaData()

# инициализация миграции
# alembic init migrations

# Создаем миграцию (ревизия)
# alembic revision --autogenerate -m "Database create"

# Проворачиваем миграцию
# alembic upgrade (hash)

# простомотр бд
# psql -h localhost -p 5432 -U postgres
# \l
# GRANT ALL PRIVILEGES ON DATABASE "Leason" TO postgres;

pages = Table(
    "pages",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
)

kpi = Table(
    "kpi",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("link", String, nullable=False),
    Column("count", Integer, nullable=False, default=0),
    Column("countSec", Integer, nullable=False, default=0),
    Column("date_at", TIMESTAMP, default=datetime.utcnow),
)

# Таблица roles
roles = Table(
    "roles",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
)

# Таблица users
users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False, unique=True),
    Column("password", BYTEA, nullable=False),  # хэшируем пароль
    Column("role_id", Integer, ForeignKey("roles.id")),
)