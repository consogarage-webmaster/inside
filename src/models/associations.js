import User from './User.js';
import Permissions from './Permissions.js';
import UsersPermissions from './UsersPermissions.js';
import Leads from './Leads.js';
import LeadsTimeline from './LeadsTimeline.js';
import LeadsQuotations from './LeadsQuotations.js';
import UsersItalSectors from './UsersItalSectors.js';
import Sector from './Sector.js';
import UsersSectors from './UsersSectors.js';
import Zipcode from './Zipcode.js';

// Users and Permissions association (Many-to-Many)
User.belongsToMany(Permissions, {
  through: UsersPermissions,
  as: 'permissions',
  foreignKey: 'id_user',
  otherKey: 'id_permission',
});

Permissions.belongsToMany(User, {
  through: UsersPermissions,
  foreignKey: 'id_permission',
  otherKey: 'id_user',
});

// User -> Ital Sectors
User.hasMany(UsersItalSectors, { foreignKey: 'id_user', as: 'italSectors' });
UsersItalSectors.belongsTo(User, { foreignKey: 'id_user' });

// Lead has many LeadQuotations (One-to-Many)
Leads.hasMany(LeadsQuotations, {
  foreignKey: 'id_lead',
  sourceKey: 'id',
});

LeadsQuotations.belongsTo(Leads, {
  foreignKey: 'id_lead',
  targetKey: 'id',
});

// Lead has many LeadsTimeline entries (One-to-Many)
Leads.hasMany(LeadsTimeline, {
  foreignKey: 'id_lead',
  sourceKey: 'id',
});

LeadsTimeline.belongsTo(Leads, {
  foreignKey: 'id_lead',
  targetKey: 'id',
});

// User ↔ Sectors (Many-to-Many)
User.belongsToMany(Sector, {
  through: UsersSectors,
  as: 'sectors',
  foreignKey: 'id_user',
  otherKey: 'id_sector',
});
Sector.belongsToMany(User, {
  through: UsersSectors,
  as: 'users',
  foreignKey: 'id_sector',
  otherKey: 'id_user',
});
// Sector ↔ Zipcode (One-to-Many)
Sector.hasMany(Zipcode, {
  foreignKey: 'id_sector',
  as: 'zipcodes',
});

Zipcode.belongsTo(Sector, {
  foreignKey: 'id_sector',
  as: 'sector',
});

export {
  User,
  Permissions,
  UsersPermissions,
  Leads,
  LeadsTimeline,
  LeadsQuotations,
  UsersItalSectors,
  Sector,
  Zipcode,
  UsersSectors,
};
