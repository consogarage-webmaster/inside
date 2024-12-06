import sequelize from '../src/config/db.js';
import { Sector, Zipcode } from '../src/models/associations.js';

const seedSectorsAndZipcodes = async () => {
  const transaction = await sequelize.transaction();
  try {
    // Step 1: Seed sectors
    const sectorsData = [
      {
        name: 'Rhone-Alpes',
        date_creation: new Date(),
        date_update: new Date(),
      },
      { name: 'Nord', date_creation: new Date(), date_update: new Date() },
      { name: 'Sud Est', date_creation: new Date(), date_update: new Date() },
      { name: 'Grand Est', date_creation: new Date(), date_update: new Date() },
      {
        name: 'Grand Ouest',
        date_creation: new Date(),
        date_update: new Date(),
      },
      {
        name: 'Bourgogne / Franche Comté',
        date_creation: new Date(),
        date_update: new Date(),
      },
      {
        name: 'Bretagne-Loire',
        date_creation: new Date(),
        date_update: new Date(),
      },
      { name: 'IdF', date_creation: new Date(), date_update: new Date() },
    ];

    const insertedSectors = await Sector.bulkCreate(sectorsData, {
      returning: true,
      transaction,
    });

    console.log('Inserted sectors:', insertedSectors);

    // Step 2: Define zip codes and link them to sectors
    const zipToSectorMapping = [
      { zipcode: 1, name: 'Ain', sector: 'Rhone-Alpes' },
      { zipcode: 2, name: 'Aisne', sector: 'Nord' },
      { zipcode: 4, name: 'Alpes-de-Haute-Provence', sector: 'Sud Est' },
      { zipcode: 5, name: 'Hautes-Alpes', sector: 'Sud Est' },
      { zipcode: 6, name: 'Alpes-Maritimes', sector: 'Sud Est' },
      { zipcode: 7, name: 'Ardèche', sector: 'Rhone-Alpes' },
      { zipcode: 8, name: 'Ardennes', sector: 'Grand Est' },
      { zipcode: 10, name: 'Aube', sector: 'Grand Est' },
      { zipcode: 11, name: 'Aude', sector: 'Sud Est' },
      { zipcode: 12, name: 'Aveyron', sector: 'Sud Est' },
      { zipcode: 13, name: 'Bouches-du-Rhône', sector: 'Sud Est' },
      { zipcode: 16, name: 'Charente', sector: 'Grand Ouest' },
      { zipcode: 17, name: 'Charente-Maritime', sector: 'Grand Ouest' },
      { zipcode: 21, name: "Côte-d'Or", sector: 'Bourgogne / Franche Comté' },
      { zipcode: 22, name: "Côtes-d'Armor", sector: 'Bretagne-Loire' },
      { zipcode: 24, name: 'Dordogne', sector: 'Grand Ouest' },
      { zipcode: 25, name: 'Doubs', sector: 'Bourgogne / Franche Comté' },
      { zipcode: 26, name: 'Drôme', sector: 'Rhone-Alpes' },
      { zipcode: 27, name: 'Eure', sector: 'IdF' },
      { zipcode: 28, name: 'Eure-et-Loir', sector: 'IdF' },
      { zipcode: 29, name: 'Finistère', sector: 'Bretagne-Loire' },
      { zipcode: 30, name: 'Gard', sector: 'Sud Est' },
      { zipcode: 33, name: 'Gironde', sector: 'Grand Ouest' },
      { zipcode: 34, name: 'Hérault', sector: 'Sud Est' },
      { zipcode: 35, name: 'Ille-et-Vilaine', sector: 'Bretagne-Loire' },
      { zipcode: 38, name: 'Isère', sector: 'Rhone-Alpes' },
      { zipcode: 39, name: 'Jura', sector: 'Bourgogne / Franche Comté' },
      { zipcode: 40, name: 'Landes', sector: 'Grand Ouest' },
      { zipcode: 42, name: 'Loire', sector: 'Rhone-Alpes' },
      { zipcode: 43, name: 'Haute-Loire', sector: 'Rhone-Alpes' },
      { zipcode: 44, name: 'Loire-Atlantique', sector: 'Bretagne-Loire' },
      { zipcode: 47, name: 'Lot-et-Garonne', sector: 'Grand Ouest' },
      { zipcode: 48, name: 'Lozère', sector: 'Sud Est' },
      { zipcode: 49, name: 'Maine-et-Loire', sector: 'Bretagne-Loire' },
      { zipcode: 51, name: 'Marne', sector: 'Grand Est' },
      { zipcode: 52, name: 'Haute-Marne', sector: 'Grand Est' },
      { zipcode: 53, name: 'Mayenne', sector: 'Bretagne-Loire' },
      { zipcode: 54, name: 'Meurthe-et-Moselle', sector: 'Grand Est' },
      { zipcode: 55, name: 'Meuse', sector: 'Grand Est' },
      { zipcode: 56, name: 'Morbihan', sector: 'Bretagne-Loire' },
      { zipcode: 57, name: 'Moselle', sector: 'Grand Est' },
      { zipcode: 58, name: 'Nièvre', sector: 'Bourgogne / Franche Comté' },
      { zipcode: 63, name: 'Puy-de-Dôme', sector: 'Rhone-Alpes' },
      { zipcode: 66, name: 'Pyrénées-Orientales', sector: 'Sud Est' },
      { zipcode: 67, name: 'Bas-Rhin', sector: 'Grand Est' },
      { zipcode: 68, name: 'Haut-Rhin', sector: 'Grand Est' },
      { zipcode: 69, name: 'Rhône', sector: 'Rhone-Alpes' },
      { zipcode: 70, name: 'Haute-Saône', sector: 'Bourgogne / Franche Comté' },
      { zipcode: 71, name: 'Saône-et-Loire', sector: 'Rhone-Alpes' },
      { zipcode: 72, name: 'Sarthe', sector: 'Bretagne-Loire' },
      { zipcode: 73, name: 'Savoie', sector: 'Rhone-Alpes' },
      { zipcode: 74, name: 'Haute-Savoie', sector: 'Rhone-Alpes' },
      { zipcode: 75, name: 'Paris', sector: 'IdF' },
      { zipcode: 91, name: 'Essonne', sector: 'IdF' },
      { zipcode: 95, name: "Val-d'Oise", sector: 'IdF' },
    ];

    const zipcodesData = zipToSectorMapping.map(dept => {
      const sector = insertedSectors.find(s => s.name === dept.sector);
      return {
        name: dept.name,
        zipcode: dept.zipcode,
        id_sector: sector ? sector.id : null,
        date_creation: new Date(),
        date_update: new Date(),
      };
    });

    const insertedZipcodes = await Zipcode.bulkCreate(zipcodesData, {
      transaction,
      returning: true,
    });

    console.log('Inserted zipcodes:', insertedZipcodes);

    // Commit transaction
    await transaction.commit();
    console.log('Sectors and zipcodes seeding completed successfully!');
  } catch (error) {
    // Rollback in case of error
    await transaction.rollback();
    console.error('Error seeding sectors and zipcodes:', error);
  }
};

// Execute the script
(async () => {
  try {
    await sequelize.authenticate();
    await seedSectorsAndZipcodes();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
