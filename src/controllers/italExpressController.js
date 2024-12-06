import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fr.js';
dayjs.locale('fr');

const apiKey = process.env.APIKEY; // Ensure API Key is set in environment variables
import constantes from '../const/constantes.js';
import Sector from '../models/Sector.js';
import Zipcode from '../models/Zipcode.js';
// const quotationStates  =[1,2,3,4,5,6,7,13,15];
let customerGroupsNames = [
  { id: 13, name: 'Hors secteur' },
  { id: 16, name: 'Ouest' },
  { id: 17, name: 'Sud-Ouest' },
  { id: 18, name: 'Région Parisienne' },
  { id: 19, name: 'Est' },
  { id: 20, name: 'Rhone Alpes' },
  { id: 21, name: 'Sud Est' },
  { id: 27, name: 'Bourgogne Franche Comté' },
];

const italExpressController = {
  customersPage: async (req, res) => {
    let customersApiUrl = `https://www.consogarage.com/consogarage-api/api/customers-italexpress.php?1=1`;
    if (req.query.name) {
      customersApiUrl += `&name=${req.query.name}`;
    }
    if (req.query.company) {
      customersApiUrl += `&company=${req.query.company}`;
    }
    if (req.query.email) {
      customersApiUrl += `&email=${req.query.email}`;
    }
    if (req.query.code) {
      customersApiUrl += `&code=${req.query.code}`;
    }
    console.log(customersApiUrl);
    try {
      // Step 1: Fetch quotations list in JSON format
      const response = await axios.get(customersApiUrl);
      const data = response.data;

      // Format the date for each customer
      const formattedData = await Promise.all(
        data.map(async customer => {
          if (!customer.departement || isNaN(customer.departement)) {
            return {
              ...customer,
              date_add: dayjs(customer.date_add).isValid()
                ? dayjs(customer.date_add).format('DD/MM/YYYY')
                : null,
              sector: 'Unknown', // Default value
            };
          }

          const sector = await Sector.findOne({
            include: {
              model: Zipcode,
              as: 'zipcodes',
              where: { zipcode: customer.departement },
            },
          });

          return {
            ...customer,
            date_add: dayjs(customer.date_add).isValid()
              ? dayjs(customer.date_add).format('DD/MM/YYYY')
              : null,
            sector: sector ? sector.name : 'Unknown', // Replace 'name' with the actual column
          };
        })
      );

      // const dataWithSectors = data.map(customer => {
      //   customer.sector = "mysector"
      // });
      res.render('pages/ital/customers.ejs', {
        customers: formattedData,
        allGroups: customerGroupsNames,
      });
    } catch (error) {
      console.error('Error fetching customers or details:', error);
      res.status(500).send('Error fetching customers data');
    }
  },
  quotationsPage: async (req, res) => {
    // Default statuses if none are selected
    const defaultQuotationsStatuses = [1, 2, 3, 4, 5, 6, 7, 13, 15];

    // Check if "status" is provided in the query; if not, use the default array
    const quotationsStatuses = req.query.status
      ? JSON.parse(req.query.status)
      : defaultQuotationsStatuses;
    const quotationSectors = req.query.customergroups
      ? JSON.parse(req.query.customergroups)
      : constantes.ital_groups;

    const quotationsApiUrl = `https://www.consogarage.com/consogarage-api/api/quotations.php?customergroups=${encodeURIComponent(`[${quotationSectors}]`)}&id_roja45_quotation_status=${encodeURIComponent(`[${quotationsStatuses}]`)}`;

    // console.log(quotationsApiUrl);

    try {
      const quotationsResponse = await axios.get(quotationsApiUrl);
      const quotationsData = quotationsResponse.data;

      // Format the `quotation.quotation_date` for each quotation
      const formattedData = quotationsData.map(initialQuote => ({
        ...initialQuote,
        quotation: {
          ...initialQuote.quotation,
          quotation_date: dayjs(initialQuote.quotation.quotation_date).isValid()
            ? dayjs(initialQuote.quotation.quotation_date).format('DD/MM/YYYY')
            : 'Invalid Date', // Fallback if the date is invalid
        },
      }));

      res.render('pages/ital/quotations.ejs', {
        quotations: formattedData,
        sectors: quotationSectors,
      });
    } catch (error) {
      console.error('Error fetching quotations or details:', error);
      res.status(500).send('Error fetching quotations data');
    }
  },
  propsectsPage: async (req, res) => {
    const prospectsApiUrl = `https://www.consogarage.com/consogarage-api/api/prospects.php`;
    const quoteProspectsApiUrl =
      'https://www.consogarage.com/consogarage-api/api/prospects.php?quoteProspects=true';
    try {
      const response = await axios.get(prospectsApiUrl);
      const data = response.data;
      const response2 = await axios.get(quoteProspectsApiUrl);
      const data2 = response2.data;
      const zipCodes = constantes.italSectorsZipCodes.find(
        sector => sector.idSector === 1
      ).zipCodes;
      res.render('pages/ital/prospects.ejs', {
        prospects: data,
        quoteProspects: data2,
        zipCodes: zipCodes,
      });
    } catch (error) {
      console.error('Error fetching prospects :', error);
      res.status(500).send('Error fetching prospects data');
    }
  },
  sectors: async (req, res) => {
    try {
      const allSectors = await Sector.findAll({
        include: {
          model: Zipcode,
          as: 'zipcodes',
        },
      });
      res.send(allSectors);
    } catch (error) {
      console.error('Error fetching sectors:', error);
      res
        .status(500)
        .send({ error: 'An error occurred while fetching sectors.' });
    }
  },
};

export default italExpressController;
