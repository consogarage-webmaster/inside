import User from './User.js';
import Permissions from './Permissions.js';
import UsersPermissions from './UsersPermissions.js';
import Leads from './Leads.js';
import LeadsTimeline from './LeadsTimeline.js';
import LeadsQuotations from './LeadsQuotations.js';
import UsersItalSectors from './UsersItalSectors.js';

User.belongsToMany(Permissions, {
  through: UsersPermissions,
  as:"permissions",
  foreignKey: 'id_user',
  otherKey: 'id_permission'
});

Permissions.belongsToMany(User, {
  through: UsersPermissions,
  foreignKey: 'id_permission',
  otherKey: 'id_user'
});

User.hasMany(UsersItalSectors, { foreignKey: 'id_user', as: 'italSectors' });
UsersItalSectors.belongsTo(User, { foreignKey: 'id_user' });

Leads.hasMany(LeadsQuotations, {
  foreignKey: 'id_lead',
  sourceKey: 'id'
});

LeadsQuotations.belongsTo(Leads, {
  foreignKey: 'id_lead',
  targetKey: 'id'
});

// Lead has many LeadsTimeline entries (One-to-Many)
Leads.hasMany(LeadsTimeline, {
  foreignKey: 'id_lead',
  sourceKey: 'id'
});

LeadsTimeline.belongsTo(Leads, {
  foreignKey: 'id_lead',
  targetKey: 'id'
});

export {
  User,
  Permissions,
  UsersPermissions,
  Leads,
  LeadsTimeline,
  LeadsQuotations,
  UsersItalSectors
};
