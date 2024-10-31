import axios from 'axios';

const apiKey = process.env.APIKEY; // Ensure API Key is set in environment variables
import constantes from '../const/constantes.js';
// const quotationStates  =[1,2,3,4,5,6,7,13,15];

const italExpressController = {
    quotationsPage: async (req, res) => {
        // Default statuses if none are selected
        const defaultQuotationsStatuses = [1, 2, 3, 4, 5, 6, 7, 13, 15];
    
        // Check if "status" is provided in the query; if not, use the default array
        const quotationsStatuses = req.query.status 
            ? JSON.parse(req.query.status): defaultQuotationsStatuses;
        const quotationSectors = req.query.customergroups ? JSON.parse(req.query.customergroups) : constantes.ital_groups;
    
        const quotationsApiUrl = `https://www.consogarage.com/consogarage-api/api/quotations.php?customergroups=${encodeURIComponent(`[${quotationSectors}]`)}&id_roja45_quotation_status=${encodeURIComponent(`[${quotationsStatuses}]`)}`;

        
    
        console.log(quotationsApiUrl);
    
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
