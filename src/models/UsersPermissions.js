import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const UsersPermissions = sequelize.define('UsersPermissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  id_permission: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'permissions',
      key: 'id'
    }
  }
}, {
  tableName: 'users_permissions',
  timestamps: false
});

export default UsersPermissions;
