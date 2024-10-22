import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Permissions = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'permissions',
  timestamps: false
});

export default Permissions;
