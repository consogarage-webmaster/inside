import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  // Definition of the columns for the User model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Auto-incrementing ID
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true  // Make this nullable if desired
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Specify the table name if it differs from model name
  timestamps: false // Set to true if you want Sequelize to manage createdAt and updatedAt fields
});

export default User;
