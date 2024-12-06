import sequelize from '../src/config/db.js'; // Import the Sequelize instance
// import {
//   User,
//   Permissions,
//   UsersPermissions,
//   Leads,
//   LeadsTimeline,
//   LeadsQuotations,
//   Sector,
//   Zipcode,
//   UsersSectors,
// } from '../src/models/associations.js'; // Import the models
import '../src/models/associations.js';

(async () => {
  try {
    // Synchronize all models with the database
    await sequelize.sync({ force: true }); // Set to `true` to drop existing tables and recreate them
    console.log('Tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
})();
