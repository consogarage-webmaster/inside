const customerGroups = [16,17,18,19,20,21,27]
document.addEventListener("DOMContentLoaded", function () {
    const apiCustomersUrl = `https://www.consogarage.com/api/customers?ws_key=GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG&filter[id_default_group]=${customerGroups}&limit=10`;
    const customerTable = document.querySelector('#customer-list'); // Make sure this is a <table>

    async function fetchCustomers() {
        try {
            const response = await fetch(apiCustomersUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.text(); // Get response as text
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            const customers = xmlDoc.getElementsByTagName("customer");
            const customerArray = [];

            for (let i = 0; i < customers.length; i++) {
                const id = customers[i].getAttribute("id");
                const href = customers[i].getAttribute("xlink:href");
                customerArray.push({ id, href });
            }

            // Fetch details for each customer
            for (const customer of customerArray) {
                await fetchCustomerDetails(customer.id);
            }

        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    }

    async function fetchCustomerDetails(customerId) {
        const customerUrl = `https://www.consogarage.com/api/customers/${customerId}?ws_key=GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG`;

        try {
            const response = await fetch(customerUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.text(); // Get response as text
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");

            // Extract required fields
            const customerInfo = xmlDoc.getElementsByTagName("customer")[0];
            const firstname = customerInfo.getElementsByTagName("firstname")[0].textContent;
            const lastname = customerInfo.getElementsByTagName("lastname")[0]?.textContent || 'N/A';
            const company = customerInfo.getElementsByTagName("company")[0].textContent;
            const id_group_default = customerInfo.getElementsByTagName("id_default_group")[0].textContent;
            const email = customerInfo.getElementsByTagName("email")[0].textContent;
            const codeital = customerInfo.getElementsByTagName("website")[0]?.textContent || ''; // Optional field
            const date_creation = customerInfo.getElementsByTagName("date_add")[0].textContent;

            if (firstname.includes("fake-user") || lastname.includes("fake-user")) {
                return; // Skip this customer
            }

            // Append a new row to the customer table
            const newRow = customerTable.insertRow();
            newRow.innerHTML = `
                <td><button class="js-modal-trigger button is-small" data-target="mainmodal" data-customer-id="${customerId}">
                    Open
                </button>${firstname} ${lastname}</td>
                <td>${company}</td>
                <td>${email}</td>
                <td>${codeital}</td>
                <td>${id_group_default}</td>
                <td>${computer.dateFr(date_creation)}</td>
            `;

        } catch (error) {
            console.error('Error fetching customer details:', error);
        }

        initModalTriggers();
    }

    async function fetchCustomerOrders(customerId) {
        const apiKey = "GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG"; 
        const apiUrl = `https://www.consogarage.com/api/orders?ws_key=${apiKey}&filter[id_customer]=${customerId}&orderBy=id&sortOrder=DESC`;
        let totalOrders = 0;
        let countOrders = 0;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            const data = await response.text(); // Get response as text
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
    
            // Log the parsed XML document
            console.log(xmlDoc);
    
            // Since the root element is <prestashop>, start by getting that
            const prestashop = xmlDoc.getElementsByTagName("prestashop")[0];
    
            if (!prestashop) {
                throw new Error('Invalid XML structure: no prestashop element found.');
            }
    
            // Now get all the orders inside the prestashop element
            const orders = prestashop.getElementsByTagName("order");
            const orderArray = [];
    
            // Iterate over the HTMLCollection of orders
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
    
                // Access the attributes and child elements of each order
                const orderId = order.getAttribute("id") || 'N/A';  // Get the ID attribute
                const orderLink = order.getAttribute("xlink:href") || 'N/A';  // Get the xlink:href attribute
    
                // Fetch detailed information for this order
                const orderDetails = await fetchOrderDetails(orderId);
                const totalPaid = orderDetails.totalPaid || 'N/A';
                const dateAdded = orderDetails.dateAdded || 'N/A';

                totalOrders += parseFloat(totalPaid);
                countOrders ++;
    
                console.log(`Order ID: ${orderId}, Link: ${orderLink}, Total Paid: ${totalPaid}, Date Added: ${dateAdded}`);
    
                orderArray.push({ orderId, orderLink, totalPaid, dateAdded });
            }
    
            // Display orders in the modal
            const modalContent = document.querySelector('#mainmodal .modal-content');
            modalContent.innerHTML = `<div class="columns">
            <h2 class="subtitle column">Orders for Customer ID: ${customerId}</h2>
            <div class="column has-text-right">Commandes : <br/>${countOrders}</div>
            <div class="column has-text-right">Total : <br/>${totalOrders.toFixed(2)} €</div>
            </div>`;
            if (orderArray.length > 0) {
                const orderTable = `
                    <table class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Link</th>
                                <th>Total Paid</th>
                                <th>Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderArray.map(order => `
                                <tr>
                                    <td>${order.orderId}</td>
                                    <td><a href="${order.orderLink}" target="_blank">View Order</a></td>
                                    <td>${order.totalPaid}</td>
                                    <td>${computer.dateFr(order.dateAdded)}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>`;
                modalContent.innerHTML += orderTable;
            } else {
                modalContent.innerHTML += `<p>No orders found for this customer.</p>`;
            }
    
        } catch (error) {
            console.error('Error fetching customer orders:', error);
        }
    }
    
    async function fetchOrderDetails(orderId) {
        const apiKey = "GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG"; // Replace with your actual API key
        const apiUrl = `https://www.consogarage.com/api/orders/${orderId}?ws_key=${apiKey}`;
    
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
    
            const data = await response.text(); // Get response as text
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
    
            // Retrieve total_paid and date_add from the order details
            const totalPaidElement = xmlDoc.getElementsByTagName("total_paid")[0];
            const dateAddedElement = xmlDoc.getElementsByTagName("date_add")[0];
    
            const totalPaid = totalPaidElement ? totalPaidElement.textContent : 'N/A';
            const dateAdded = dateAddedElement ? dateAddedElement.textContent : 'N/A';
    
            return { totalPaid, dateAdded };
    
        } catch (error) {
            console.error(`Error fetching order details for Order ID ${orderId}:`, error);
            return { totalPaid: 'N/A', dateAdded: 'N/A' }; // Return N/A on error
        }
    }
    
    

    function openModal($el, customerId) {
        $el.classList.add('is-active');
        fetchCustomerOrders(customerId); // Fetch and display customer orders
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    function initModalTriggers() {
        (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modalId = $trigger.dataset.target;
            const $target = document.getElementById(modalId);
            const customerId = $trigger.dataset.customerId; // Get the customer ID from the button

            $trigger.addEventListener('click', () => {
                openModal($target, customerId); // Pass the customer ID to openModal
            });
        });

        // Add a click event on various child elements to close the parent modal
        (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
            const $target = $close.closest('.modal');

            $close.addEventListener('click', () => {
                closeModal($target);
            });
        });

        // Add a keyboard event to close all modals
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                closeAllModals();
            }
        });
    }

    fetchCustomers();
});
const computer={
    dateFr :(dateString)=>{
        const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with 0
    const year = date.getFullYear(); // Get the year
    return `${day}/${month}/${year}`; // Return formatted date as DD/MM/YYYY
    }
}