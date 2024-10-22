import sequelize from '../src/config/db.js';
import { Permissions, User, UsersPermissions } from '../src/models/associations.js'; 

const seedData = async () => {
  const transaction = await sequelize.transaction();
  try {
    // Truncate the tables
    // await sequelize.query('TRUNCATE TABLE permissions CASCADE', { transaction });
    // await sequelize.query('TRUNCATE TABLE users CASCADE', { transaction });
    // await sequelize.query('TRUNCATE TABLE users_permissions CASCADE', { transaction });
    // console.log('Tables truncated.');

    // Insert new permissions
    const insertedPermissions = await Permissions.bulkCreate([
      { name: 'superadmin', created_at: new Date(), updated_at: new Date() },
      { name: 'commercial-consogarage', created_at: new Date(), updated_at: new Date() },
      { name: 'commercial-italexpress', created_at: new Date(), updated_at: new Date() },
      { name: 'direction-italexpress', created_at: new Date(), updated_at: new Date() },
    ], { returning: true, transaction });

    console.log('Inserted permissions:', insertedPermissions);

    // Insert new users
    const usersData = [
      { name: 'admin', email: 'web@consogarage.com', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'scainero', email: 'scainero@consogarage.com', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'user_3', email: 'user_3@example.com', password: 'password123', created_at: new Date(), updated_at: new Date() },
      { name: 'user_4', email: 'user_4@example.com', password: 'password123', created_at: new Date(), updated_at: new Date() }
    ];

    const insertedUsers = await User.bulkCreate(usersData, { returning: true, transaction });
    console.log('Inserted users:', insertedUsers);

    // Associate users with permissions
    const usersPermissionsData = insertedUsers.map((user, index) => ({
      id_user: user.id,
      id_permission: insertedPermissions[index].id
    }));

    await UsersPermissions.bulkCreate(usersPermissionsData, { transaction });
    console.log('User permissions assigned successfully.');

    // Commit transaction
    await transaction.commit();

    // Check if tables are filled
    const permissions = await Permissions.findAll();
    const users = await User.findAll();
    const usersPermissions = await UsersPermissions.findAll();

    console.log('Permissions after seeding:', permissions);
    console.log('Users after seeding:', users);
    console.log('UsersPermissions after seeding:', usersPermissions);

    console.log('Seeding completed successfully!');
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    console.error('Error seeding data:', error);
  }
};

(async () => {
  try {
    await sequelize.authenticate(); 
    await seedData();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
