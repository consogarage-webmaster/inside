import User from './User.js';
import Permissions from './Permissions.js';
import UsersPermissions from './UsersPermissions.js';
import Leads from './Leads.js';
import LeadsTimeline from './LeadsTimeline.js';
import LeadsQuotations from './LeadsQuotations.js';

// Users and Permissions association (Many-to-Many)
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

// Lead has many LeadQuotations (One-to-Many)
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

// Export the associations
export {
  User,
  Permissions,
  UsersPermissions,
  Leads,
  LeadsTimeline,
  LeadsQuotations
};
