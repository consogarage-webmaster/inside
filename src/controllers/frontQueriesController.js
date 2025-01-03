import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const apiKey = process.env.APIKEY;
const cgapiKey = process.env.CGAPIKEY;

const frontQueriesController = {
  getCustomerOrders: async (req, res) => {
    const customerId = req.params['id'];
    let fromDate = '';
    let toDate = '';
    if (req.query['fromdate']) {
      fromDate = `&datefrom=${req.query['fromdate']}`;
    }
    if (req.query['todate']) {
      toDate = `&dateto=${req.query['todate']}`;
    }

    // console.log('Starting webservice request');

    // Construct the API URL
    // const webserviceUrl = `https://www.consogarage.com/api/orders?ws_key=${apiKey}&filter[id_customer]=[${customerId}]&filter[valid]=[1]&display=full&sort=[id_DESC]&output_format=JSON`;
    const cgapiurl = `https://www.consogarage.com/consogarage-api/api/orders.php?api_key=${cgapiKey}&idcustomer=${customerId}${fromDate}${toDate}`;

    console.log('Constructed URL:', cgapiurl);

    try {
      // Fetch data from the API using axios
      const response = await axios.get(cgapiurl);

      // Return the API response data to the frontend
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching data from the API:', error.message);

      // Return an error response
      res.status(500).json({ error: 'Failed to fetch customer orders' });
    }
  },
};

export default frontQueriesController;
