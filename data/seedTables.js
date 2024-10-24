import sequelize from '../src/config/db.js';
import { Permissions, User, UsersPermissions, UsersItalSectors } from '../src/models/associations.js';

const seedData = async () => {
  const transaction = await sequelize.transaction();
  try {
    // Truncate the tables if necessary
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
      // Equipe Consogarage
      { name: 'admin', email: 'web@consogarage.com', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'scainero', email: 'scainero@consogarage.com', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Brunau DUMARAIS', email: 'bruno@consogarage.com', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      // Commerciaux Ital Express
      { name: 'Fabrice DETHOREY', email: 'fdethorey@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Patrick FORESTIER', email: 'pforestier@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Bertrand GARIN', email: 'bgarinsudest@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Frédéric KINOO', email: 'fkinoo@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Steven DEPIERRE', email: 'sdepierre@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Thomas AUNEAU', email: 'tauneau@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() },
      { name: 'Jean-Marc NEAU', email: 'jmneau@ital-express.fr', password: '$argon2id$v=19$m=65536,t=3,p=4$VdcBaM54OO/Ud/YCFhUKUA$fT4ZfzYF2/2QHtU/K9VnRWNPBjnLRTn3qzPLBEtPNCs', created_at: new Date(), updated_at: new Date() }
    ];

    const insertedUsers = await User.bulkCreate(usersData, { returning: true, transaction });
    console.log('Inserted users:', insertedUsers);

    // Get permission IDs
    const superadminPermission = insertedPermissions.find(perm => perm.name === 'superadmin');
    const directionPermission = insertedPermissions.find(perm => perm.name === 'direction-italexpress');
    const commercialPermission = insertedPermissions.find(perm => perm.name === 'commercial-italexpress');

    // Prepare user permissions assignments
    const usersPermissionsData = insertedUsers.map(user => {
      if (['admin', 'scainero'].includes(user.name)) {
        return { id_user: user.id, id_permission: superadminPermission.id };
      } else if (user.name === 'Fabrice DETHOREY') {
        return { id_user: user.id, id_permission: directionPermission.id };
      } else {
        return { id_user: user.id, id_permission: commercialPermission.id };
      }
    });

    // Associate users with their respective permissions
    await UsersPermissions.bulkCreate(usersPermissionsData, { transaction });
    console.log('User permissions assigned successfully.');

    // Insert ItalSectors associations
    const italSectorsData = [
      { id_user: insertedUsers.find(user => user.email === 'pforestier@ital-express.fr').id, id_group: 30 },
      { id_user: insertedUsers.find(user => user.email === 'bgarinsudest@ital-express.fr').id, id_group: 31 },
      { id_user: insertedUsers.find(user => user.email === 'fkinoo@ital-express.fr').id, id_group: 32 },
      { id_user: insertedUsers.find(user => user.email === 'sdepierre@ital-express.fr').id, id_group: 33 },
      { id_user: insertedUsers.find(user => user.email === 'tauneau@ital-express.fr').id, id_group: 34 },
      { id_user: insertedUsers.find(user => user.email === 'jmneau@ital-express.fr').id, id_group: 36 },
    ];

    await UsersItalSectors.bulkCreate(italSectorsData, { transaction });
    console.log('ItalSectors assigned successfully.');

    // Commit transaction
    await transaction.commit();

    // Optional: Check if tables are filled correctly
    const permissions = await Permissions.findAll();
    const users = await User.findAll();
    const usersPermissions = await UsersPermissions.findAll();
    const italSectors = await UsersItalSectors.findAll();

    console.log('Permissions after seeding:', permissions);
    console.log('Users after seeding:', users);
    console.log('UsersPermissions after seeding:', usersPermissions);
    console.log('UsersItalSectors after seeding:', italSectors);

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
