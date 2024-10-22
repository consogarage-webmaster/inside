import sequelize from '../src/config/db.js';  // Import the Sequelize instance
import { User, Permissions, UsersPermissions, Leads, LeadsTimeline, LeadsQuotations } from '../src/models/associations.js';  // Import the models

(async () => {
  try {
    // Synchronize all models with the database
    await sequelize.sync({ force: false });  // Set to `true` to drop existing tables and recreate them
    console.log('Tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
})();
