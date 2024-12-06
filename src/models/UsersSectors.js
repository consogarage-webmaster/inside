import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UsersSectors = sequelize.define(
  'UsersSectors',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sector',
        key: 'id',
      },
    },
  },
  {
    tableName: 'users_sectors',
    createdAt: 'date_creation',
    updatedAt: 'date_update',
  }
);

export default UsersSectors;
