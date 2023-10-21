"""empty message

Revision ID: 499f37841bc7
Revises: 7be53b6e7ae7
Create Date: 2023-10-20 22:52:58.342825

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '499f37841bc7'
down_revision = '7be53b6e7ae7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('hashed_password', sa.String(length=240), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_column('hashed_password')
        batch_op.drop_column('name')

    # ### end Alembic commands ###
