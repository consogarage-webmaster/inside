// usersItalSectors.js

import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';
import sequelize from '../config/db.js';
import {User} from './associations.js'; 
const UsersItalSectors = sequelize.define('usersItalSectors', {
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // This points to the User model
            key: 'id',
        },
        allowNull: false,
    },
    id_group: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'users_ital_sectors',
    timestamps: false,  // Assuming you don’t need created_at or updated_at fields
});

export default UsersItalSectors;
