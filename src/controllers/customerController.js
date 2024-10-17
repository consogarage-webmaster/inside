import axios from 'axios';
import xml2js from 'xml2js';

const apiKey = 'GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG';
const parser = new xml2js.Parser();

const customerController = {
    italCustomers: async (req, res) => {
        const customerGroups = ['1', '2', '3']; 
        const customerGroupsNames = [
            { id: 13, name: 'Hors secteur' },
            { id: 16, name: 'Ouest' },
            { id: 17, name: 'Sud-Ouest' },
            { id: 18, name: 'Région Parisienne' },
            { id: 19, name: 'Est' },
            { id: 20, name: 'Rhone Alpes' },
            { id: 21, name: 'Sud Est' },
            { id: 27, name: 'Bourgogne Franche Comté' }
        ];
        const groupIds = customerGroupsNames.map(group => group.id);

// Join group IDs into a string for the URL parameter
const groupIdsString = groupIds.join(',');

        
const apiCustomersUrl = `https://www.consogarage.com/api/customers?ws_key=${apiKey}&filter[id_default_group]=[${groupIdsString}]&limit=100`;
        
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

            // Fetch details for each customer, including group name
            const customerDetailsPromises = customerArray.map(customer => fetchCustomerDetails(customer.id));
            const customerDetails = (await Promise.all(customerDetailsPromises)).filter(detail => detail !== null);

            // Pass the customer details to the EJS template
            res.render('ital/italCustomers.ejs', { customers: customerDetails, allGroups : customerGroupsNames });

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
        const id = customerInfo.id?.[0];
        const firstname = customerInfo.firstname?.[0] || '';
        const lastname = customerInfo.lastname?.[0] || '';
        const company = customerInfo.company?.[0] || '';
        const id_group_default = customerInfo.id_default_group?.[0]?._ || ''; // Default group ID
        const email = customerInfo.email?.[0] || '';
        const codeital = customerInfo.website?.[0] || ''; // Optional field
        const date_creation = customerInfo.date_add?.[0] || '';

        if (firstname.includes("fake-user") || lastname.includes("fake-user")) {
            return null; // Skip this customer
        }

        // Fetch the group name based on id_group_default
        const name_group_default = await fetchGroupName(id_group_default);

        return {
            id,
            firstname,
            lastname,
            company,
            email,
            codeital,
            id_group_default,
            name_group_default, // Add group name to customer details
            date_creation,
        };

    } catch (error) {
        console.error(`Error fetching details for customer ${customerId}:`, error);
        return null;
    }
}

// Helper function to fetch group name
async function fetchGroupName(groupId) {
    const groupUrl = `https://www.consogarage.com/api/groups/${groupId}?ws_key=${apiKey}`;

    try {
        const response = await axios.get(groupUrl);
        const data = response.data;

        const result = await parser.parseStringPromise(data);

        if (!result.prestashop || !result.prestashop.group || !result.prestashop.group[0]) {
            console.error(`Unexpected XML structure for group ${groupId}:`, result);
            return '';
        }

        const groupInfo = result.prestashop.group[0];
        const groupName = groupInfo.name?.[0] || '';

        return groupName;
    } catch (error) {
        console.error(`Error fetching group ${groupId}:`, error);
        return '';
    }
}

export default customerController;
