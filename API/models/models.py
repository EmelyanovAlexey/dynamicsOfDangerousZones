from datetime import datetime
from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP, ForeignKey

metadata = MetaData()

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
    Column("count", Integer, nullable=False),
    Column("date_at", TIMESTAMP, default=datetime.utcnow),
)