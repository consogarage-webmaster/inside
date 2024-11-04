import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/fr.js';
dayjs.locale('fr'); 

const apiKey = process.env.APIKEY; // Ensure API Key is set in environment variables
import constantes from '../const/constantes.js';
// const quotationStates  =[1,2,3,4,5,6,7,13,15];
let customerGroupsNames = [
    { id: 13, name: 'Hors secteur' },
    { id: 16, name: 'Ouest' },
    { id: 17, name: 'Sud-Ouest' },
    { id: 18, name: 'Région Parisienne' },
    { id: 19, name: 'Est' },
    { id: 20, name: 'Rhone Alpes' },
    { id: 21, name: 'Sud Est' },
    { id: 27, name: 'Bourgogne Franche Comté' }
];

const italExpressController = {
    customersPage: async (req, res) => {
        const customersApiUrl = `https://www.consogarage.com/consogarage-api/api/customers-italexpress.php`;
        try {
            // Step 1: Fetch quotations list in JSON format
            const response = await axios.get(customersApiUrl);
            const data = response.data;

            // Format the date for each customer
            const formattedData = data.map(customer => ({
                ...customer,
                date_add: dayjs(customer.date_add).format('DD/MM/YYYY') // Format in French day/month/year format
            }));

            res.render('pages/ital/customers.ejs', { customers: formattedData, allGroups: customerGroupsNames });

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
            ? JSON.parse(req.query.status): defaultQuotationsStatuses;
        const quotationSectors = req.query.customergroups ? JSON.parse(req.query.customergroups) : constantes.ital_groups;
    
        const quotationsApiUrl = `https://www.consogarage.com/consogarage-api/api/quotations.php?customergroups=${encodeURIComponent(`[${quotationSectors}]`)}&id_roja45_quotation_status=${encodeURIComponent(`[${quotationsStatuses}]`)}`;

        
    
        // console.log(quotationsApiUrl);
    
        try {
            // Step 1: Fetch quotations list in JSON format
            const quotationsResponse = await axios.get(quotationsApiUrl);
            const quotationsData = quotationsResponse.data;
            res.render('pages/ital/quotations.ejs', { quotations: quotationsData, sectors :  quotationSectors });
    
        } catch (error) {
            console.error('Error fetching quotations or details:', error);
            res.status(500).send('Error fetching quotations data');
        }
    },
    propsectsPage:async (req,res) =>{
        const prospectsApiUrl = `https://www.consogarage.com/consogarage-api/api/prospects.php`;
        try{
            const response = await axios.get(prospectsApiUrl);
            const data = response.data; 
            res.render('pages/ital/prospects.ejs',{prospects : data});
        } catch (error) {
            console.error('Error fetching prospects :', error);
            res.status(500).send('Error fetching prospects data');
        }

        
    }
};

export default italExpressController;
