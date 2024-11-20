import sequelize from '../src/config/db.js'; 
import { User, Permissions, UsersPermissions, Leads, LeadsTimeline, LeadsQuotations } from '../src/models/associations.js'; 

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
})();
