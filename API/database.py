from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData

# Общие метаданные для моделей
metadata = MetaData()

# Замените URL на ваш реальный URL для подключения к PostgreSQL (асинхронный движок)
DATABASE_URL = "postgresql+asyncpg://postgres:1111@localhost:5432/Leason"

# Создаем асинхронный движок
engine = create_async_engine(DATABASE_URL, echo=True)

# Создаем фабрику асинхронных сессий
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)