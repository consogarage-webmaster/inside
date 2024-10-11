import axios from 'axios';
import xml2js from 'xml2js';

const apiKey = 'GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG';
const parser = new xml2js.Parser();

const customerController = {
    italCustomers: async (req, res) => {
        const customerGroups = ['1', '2', '3']; // Adjust or fetch dynamically if needed
        const apiCustomersUrl = `https://www.consogarage.com/api/customers?ws_key=${apiKey}&filter[id_default_group]=[1,2]}&limit=10`;
        
        try {
            const response = await axios.get(apiCustomersUrl);
            const data = response.data;

            const result = await parser.parseStringPromise(data);

            // Ensure the XML response has the expected structure
            if (!result.prestashop || !result.prestashop.customers || !result.prestashop.customers[0].customer) {
                console.error('Unexpected XML structure:', result);
                return res.status(500).send('Unexpected XML structure received from API');
            }

            const customers = result.prestashop.customers[0].customer;

            // Map customer IDs using the `$` property
            const customerArray = customers.map(customer => ({
                id: customer.$.id,
            }));

            // Fetch details for each customer
            const customerDetailsPromises = customerArray.map(customer => fetchCustomerDetails(customer.id));
            const customerDetails = (await Promise.all(customerDetailsPromises)).filter(detail => detail !== null);
console.log(customerDetails)
            // Pass the customer details to the EJS template
            res.render('ital/italCustomers.ejs', { customers: customerDetails });

        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).send('Error fetching customer data');
        }
    }
};

// Helper function to fetch customer details
async function fetchCustomerDetails(customerId) {
    const customerUrl = `https://www.consogarage.com/api/customers/${customerId}?ws_key=${apiKey}`;

    try {
        const response = await axios.get(customerUrl);
        const data = response.data;

        const result = await parser.parseStringPromise(data);

        if (!result.prestashop || !result.prestashop.customer || !result.prestashop.customer[0]) {
            console.error(`Unexpected XML structure for customer ${customerId}:`, result);
            return null;
        }

        const customerInfo = result.prestashop.customer[0];

        // Extract required fields
        const firstname = customerInfo.firstname?.[0] || 'N/A';
        const lastname = customerInfo.lastname?.[0] || 'N/A';
        const company = customerInfo.company?.[0] || 'N/A';
        const id_group_default = customerInfo.id_default_group?.[0] || 'N/A';
        const email = customerInfo.email?.[0] || 'N/A';
        const codeital = customerInfo.website?.[0] || ''; // Optional field
        const date_creation = customerInfo.date_add?.[0] || 'N/A';

        if (firstname.includes("fake-user") || lastname.includes("fake-user")) {
            return null; // Skip this customer
        }

        return {
            firstname,
            lastname,
            company,
            email,
            codeital,
            id_group_default,
            date_creation,
        };

    } catch (error) {
        console.error(`Error fetching details for customer ${customerId}:`, error);
        return null;
    }
}

export default customerController;
