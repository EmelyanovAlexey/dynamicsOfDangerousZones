"""add time_spent column to kpi

Revision ID: 933607e875bf
Revises: 8361ac970fa6
Create Date: 2024-10-05 18:18:44.583976

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '933607e875bf'
down_revision: Union[str, None] = '8361ac970fa6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
