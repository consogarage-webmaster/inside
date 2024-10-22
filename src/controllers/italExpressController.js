import axios from 'axios';

const apiKey = process.env.APIKEY; // Ensure API Key is set in environment variables
import constantes from '../const/constantes.js';
// const quotationStates  =[1,2,3,4,5,6,7,13,15];
const quotationStates  =[7];
const italExpressController = {
    quotationsPage: async (req, res) => {
        const quotationsApiUrl = `https://www.consogarage.com/inside-2.0/api/quotations.php?customergroups=${encodeURIComponent(`[${constantes.ital_groups}]`)}&id_roj45_quotation_status=${encodeURIComponent(`[${quotationStates}]`)}`;

        console.log(quotationsApiUrl);

        try {
            // Step 1: Fetch quotations list in JSON format
            const quotationsResponse = await axios.get(quotationsApiUrl);
            const quotationsData = quotationsResponse.data;
            res.render('pages/ital/quotations.ejs', { quotations: quotationsData });

        } catch (error) {
            console.error('Error fetching quotations or details:', error);
            res.status(500).send('Error fetching quotations data');
        }
    }
};

export default italExpressController;
