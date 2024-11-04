"""Add default roles

Revision ID: 67b7aacc19dc
Revises: d5985747710d
Create Date: 2024-10-31 18:39:40.702120

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer

# Определяем таблицу roles для вставки данных
roles_table = table(
    'roles',
    column('id', Integer),
    column('name', String)
)

# revision identifiers, used by Alembic.
revision: str = '67b7aacc19dc'
down_revision: Union[str, None] = 'd5985747710d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Добавляем роли user и admin
    op.bulk_insert(
        roles_table,
        [
            {"id": 1, "name": "user"},
            {"id": 2, "name": "admin"},
        ]
    )


def downgrade() -> None:
    # Удаляем роли user и admin, если потребуется откатить миграцию
    op.execute("DELETE FROM roles WHERE name IN ('user', 'admin')")
