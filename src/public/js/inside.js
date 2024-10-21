const customerGroups = [13,16,17,18,19,20,21,27];
const loadingAnimation = ` <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

    <dotlottie-player src="https://lottie.host/4cb34855-b2b5-484b-a16e-98d45e9299dc/2GtX5kqon8.json" background="transparent" speed="1" style="width: 150px; height: 150px; margin:auto;" loop autoplay></dotlottie-player>`;

    const apiKey = "GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG"; 
    let modalContent = document.querySelector('#mainmodal .modal-content');
    document.addEventListener("DOMContentLoaded", function () {
    modalContent = document.querySelector('#mainmodal .modal-content');
    });
document.addEventListener("DOMContentLoaded", function () {
        initModalTriggers();
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
            
            modalContent.innerHTML = `<div class="columns">
            <h2 class="subtitle column">Orders for Customer ID: ${customerId}</h2>
            <div class="column has-text-right">Commandes : <br/>${countOrders}</div>
            <div class="column has-text-right">Total : <br/>${totalOrders.toFixed(2)} €</div>
            </div>
            <div class="has-text-right"><button class="button has-text-success" onclick=fetchAndDownloadCSV()><i class="fas fa-file-csv"></i></button></div>`;
            if (orderArray.length > 0) {
                const orderTable = `
                    <table id="customer-orders" class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Link</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderArray.map(order => `
                                <tr>
                                    <td>${order.orderId}</td>
                                    <td><a href="${order.orderLink}" target="_blank">View Order</a></td>
                                    <td class="has-text-right">${parseFloat(order.totalPaid).toFixed(2)}</td>
                                    <td>${computer.dateFr(order.dateAdded)}</td>
                                </tr>`).join('')}
                        </tbody>
                    </table>`;
                modalContent.innerHTML += orderTable;
            } else {
                modalContent.innerHTML += `<p class="has-text-centered has-text-warning">Aucune commande trouvée.</p>`;
            }
    
        } catch (error) {
            console.error('Error fetching customer orders:', error);
        }
    }
    
    async function fetchOrderDetails(orderId) {
       
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
    
            const totalPaid = totalPaidElement ? totalPaidElement.textContent : '';
            const dateAdded = dateAddedElement ? dateAddedElement.textContent : '';
    
            return { totalPaid, dateAdded };
    
        } catch (error) {
            console.error(`Error fetching order details for Order ID ${orderId}:`, error);
            return { totalPaid: 'N/A', dateAdded: 'N/A' }; // Return N/A on error
        }
    }
    
    

    function openModal($el, customerId) {
        $el.classList.add('is-active');
        fetchCustomerOrders(customerId);
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
        modalContent.innerHTML = loadingAnimation;
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

    // fetchCustomers();
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

// Authentication
// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.querySelector('#loginForm');
    
//     if (loginForm) {
//         loginForm.addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const username = loginForm.username.value; // Assuming your input field has the name "username"
//             const password = loginForm.password.value; // Assuming your input field has the name "password"
//             await authenticationController.submitLogin(username, password);
//         });
//     }
// });

const authenticationController = {
    submitLogin: async (username, password) => {
        const loginUrl = '/login'; 

        // Prepare the request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Include username and password
        };

        try {
            const response = await fetch(loginUrl, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }

            const data = await response.json(); // Assuming the server responds with JSON
            console.log('Login successful:', data);

            // Store the token in localStorage
            localStorage.setItem('jwtToken', data.token); 

            // Redirect after successful login
            // window.location.href = '/dashboard'; // Update with your desired redirect URL
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please check your username and password.'); // Inform user of the error
        }
    }
};

// document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch protected page data
    function fetchProtectedPage(url) {
        // Get the token from local storage
        const token = localStorage.getItem('jwtToken');
        console.log('token ' + token)

        // Fetch the page data
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Access denied');
            }
        })
        .then(html => {
            // Render the content
            document.open();
            document.write(html);
            document.close();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Access denied: Please log in');
        });
    }
    initProtectedLinks()
   
// });
 // Add event listeners to all links that should call the fetch function
 document.addEventListener('DOMContentLoaded', () => {
    // Select all the links you want to bind the function to
    initProtectedLinks();
});
function initProtectedLinks(){
    const protectedLinks = document.querySelectorAll('.protected-link');

    // Add click event listeners to those links
    protectedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            alert('ok')
            const url = event.target.getAttribute('href'); // Get the URL from the link
            fetchProtectedPage(url); // Call the fetch function with the URL
        });
    });
}


function getFilteredItalCustomers(){
    // alert('ital');
    const selectedSector = document.querySelector('#sector-selector select').value;
    location.href=`/ital-clients?sector=${selectedSector}`;
}
document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.querySelector('#ital-customer-filter');
    filterBtn.addEventListener("click",getFilteredItalCustomers);
});

async function fetchAndDownloadCSV() {
    // Get all order links
    const orders = document.querySelectorAll("#customer-orders td a");
    let allCsvContent = ""; // Variable to accumulate CSV content from all orders

    // Define the headers for the CSV
    const headers = [
        'Id facture',
        'Date facture',
        'Date commande',
        'Mode de paiement',
        'Total HT',
        'Total articles HT',
        'Total transport HT',
        'Ref commande',
        'Id article',
        'Id déclinaison',
        'quantité',
        'Reference',
        'Dénomination',
        'Prix unitaire HT'
    ];
    
    // Add headers to the CSV content
    allCsvContent += headers.join(',') + '\n';

    for (let order of orders) {
        let orderUrl = order.href;
        orderUrl += `?ws_key=${apiKey}&output_format=JSON`;
        try {
            // Fetch order details
            const response = await fetch(orderUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok for ' + orderUrl);
            }
            
            const orderData = await response.json(); // Get the order data as JSON
            
            const orderInfo = orderData.order;

            // Extract common order information
            const invoiceNumber = orderInfo.invoice_number;
            const invoiceDate = orderInfo.invoice_date;
            const dateAdd = orderInfo.date_add;
            const payment = orderInfo.payment;
            const totalPaidTaxExcl = orderInfo.total_paid_tax_excl;
            const totalProducts = orderInfo.total_products;
            const totalShippingTaxExcl = orderInfo.total_shipping_tax_excl;
            const reference = orderInfo.reference;

            // Iterate through each product (order row) in the order
            orderInfo.associations.order_rows.forEach(product => {
                const productId = product.product_id;
                const productAttributeId = product.product_attribute_id;
                const productQuantity = product.product_quantity;
                const productReference = product.product_reference;
                const productName = product.product_name;
                const productPrice = product.product_price;

                // Build the CSV row for this product
                const csvRow = [
                    invoiceNumber,
                    invoiceDate,
                    dateAdd,
                    payment,
                    totalPaidTaxExcl,
                    totalProducts,
                    totalShippingTaxExcl,
                    reference,
                    productId,
                    productAttributeId,
                    productQuantity,
                    productReference,
                    productName,
                    productPrice
                ];

                // Add the row to the CSV content
                allCsvContent += csvRow.join(',') + '\n';
            });

        } catch (e) {
            console.error('There was an error fetching the order details:', e);
        }
    }

    // Now that all CSV content is accumulated, create and download the combined file
    if (allCsvContent) {
        const blob = new Blob([allCsvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'all_orders.csv'); // Set download attribute to suggest file name
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    }
}

