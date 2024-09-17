"""added description to name and location

Revision ID: 6b77525d7908
Revises: b06ddedd6d47
Create Date: 2024-09-17 06:26:50.661983

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b77525d7908'
down_revision = 'b06ddedd6d47'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('animals', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))

    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('locations', schema=None) as batch_op:
        batch_op.drop_column('description')

    with op.batch_alter_table('animals', schema=None) as batch_op:
        batch_op.drop_column('description')

    # ### end Alembic commands ###
