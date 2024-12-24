import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const apiKey = process.env.APIKEY;

const frontQueriesController = {
  getCustomerOrders: async (req, res) => {
    const customerId = req.params['id'];
    console.log('Starting webservice request');

    // Construct the API URL
    const webserviceUrl = `https://www.consogarage.com/api/orders?ws_key=${apiKey}&filter[id_customer]=[${customerId}]&filter[valid]=[1]&display=full&sort=[id_DESC]&output_format=JSON`;

    console.log('Constructed URL:', webserviceUrl);

    try {
      // Fetch data from the API using axios
      const response = await axios.get(webserviceUrl);

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
