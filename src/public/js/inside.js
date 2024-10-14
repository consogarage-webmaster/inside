const customerGroups = [13,16,17,18,19,20,21,27];
const loadingAnimation = ` <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

    <dotlottie-player src="https://lottie.host/4cb34855-b2b5-484b-a16e-98d45e9299dc/2GtX5kqon8.json" background="transparent" speed="1" style="width: 150px; height: 150px; margin:auto;" loop autoplay></dotlottie-player>`;
    let modalContent = document.querySelector('#mainmodal .modal-content');
    document.addEventListener("DOMContentLoaded", function () {
    modalContent = document.querySelector('#mainmodal .modal-content');
    });
document.addEventListener("DOMContentLoaded", function () {
//     const apiCustomersUrl = `https://www.consogarage.com/api/customers?ws_key=GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG&filter[id_default_group]=${customerGroups}&limit=10`;
//     const customerTable = document.querySelector('#customer-list'); // Make sure this is a <table>

//     async function fetchCustomers() {
//         // Sélecteur de secteur
//         const container = document.querySelector('#sector-selector');
//         let options = '';
//         customerGroups.forEach((group)=>{
//             options += `<option value="${group}">${group}</option>`;
//         })
//         container.innerHTML = `<div class="select">
//     <select>
//         <option value="all" selected>Tous</option>
//         ${options}
//     </select>
// </div>`;
//         try {
//             const response = await fetch(apiCustomersUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }

//             const data = await response.text(); // Get response as text
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(data, "application/xml");

//             const customers = xmlDoc.getElementsByTagName("customer");
//             const customerArray = [];

//             for (let i = 0; i < customers.length; i++) {
//                 const id = customers[i].getAttribute("id");
//                 const href = customers[i].getAttribute("xlink:href");
//                 customerArray.push({ id, href });
//             }

//             // Fetch details for each customer
//             for (const customer of customerArray) {
//                 await fetchCustomerDetails(customer.id);
//             }

//         } catch (error) {
//             console.error('Error fetching customers:', error);
//         }
//     }

//     async function fetchCustomerDetails(customerId) {
//         const customerUrl = `https://www.consogarage.com/api/customers/${customerId}?ws_key=GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG`;

//         try {
//             const response = await fetch(customerUrl);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }

//             const data = await response.text(); // Get response as text
//             const parser = new DOMParser();
//             const xmlDoc = parser.parseFromString(data, "application/xml");

//             // Extract required fields
//             const customerInfo = xmlDoc.getElementsByTagName("customer")[0];
//             const firstname = customerInfo.getElementsByTagName("firstname")[0].textContent;
//             const lastname = customerInfo.getElementsByTagName("lastname")[0]?.textContent || 'N/A';
//             const company = customerInfo.getElementsByTagName("company")[0].textContent;
//             const id_group_default = customerInfo.getElementsByTagName("id_default_group")[0].textContent;
//             const email = customerInfo.getElementsByTagName("email")[0].textContent;
//             const codeital = customerInfo.getElementsByTagName("website")[0]?.textContent || ''; // Optional field
//             const date_creation = customerInfo.getElementsByTagName("date_add")[0].textContent;

//             if (firstname.includes("fake-user") || lastname.includes("fake-user")) {
//                 return; // Skip this customer
//             }

//             // Append a new row to the customer table
//             const newRow = customerTable.insertRow();
//             newRow.innerHTML = `
//                 <td><button class="js-modal-trigger button is-small" data-target="mainmodal" data-customer-id="${customerId}">
//                     Open
//                 </button>${firstname} ${lastname}</td>
//                 <td>${company}</td>
//                 <td>${email}</td>
//                 <td>${codeital}</td>
//                 <td>${id_group_default}</td>
//                 <td>${computer.dateFr(date_creation)}</td>
//             `;

//         } catch (error) {
//             console.error('Error fetching customer details:', error);
//         }

//         initModalTriggers();
//     }

//    async function fetchCustomerDetails(customerId) {
//             const customerUrl = `https://www.consogarage.com/api/customers/${customerId}?ws_key=GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG`;
    
//             try {
//                 const response = await fetch(customerUrl);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok ' + response.statusText);
//                 }
    
//                 const data = await response.text(); // Get response as text
//                 const parser = new DOMParser();
//                 const xmlDoc = parser.parseFromString(data, "application/xml");
    
//                 // Extract required fields
//                 const customerInfo = xmlDoc.getElementsByTagName("customer")[0];
//                 const firstname = customerInfo.getElementsByTagName("firstname")[0].textContent;
//                 const lastname = customerInfo.getElementsByTagName("lastname")[0]?.textContent || '';
//                 const company = customerInfo.getElementsByTagName("company")[0].textContent;
//                 const id_group_default = customerInfo.getElementsByTagName("id_default_group")[0].textContent;
//                 const email = customerInfo.getElementsByTagName("email")[0].textContent;
//                 const codeital = customerInfo.getElementsByTagName("website")[0]?.textContent || ''; // Optional field
//                 const date_creation = customerInfo.getElementsByTagName("date_add")[0].textContent;
    
//                 if (firstname.includes("fake-user") || lastname.includes("fake-user")) {
//                     return; // Skip this customer
//                 }
    
//                 // Append a new row to the customer table
//                 const newRow = customerTable.insertRow();
//                 newRow.innerHTML = `
//                     <td><button class="js-modal-trigger button is-small" data-target="mainmodal" data-customer-id="${customerId}">
//                         Open
//                     </button>${firstname} ${lastname}</td>
//                     <td>${company}</td>
//                     <td>${email}</td>
//                     <td>${codeital}</td>
//                     <td>${id_group_default}</td>
//                     <td>${computer.dateFr(date_creation)}</td>
//                 `;
    
//             } catch (error) {
//                 console.error('Error fetching customer details:', error);
//             }
    
//             // initModalTriggers();
//         }

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
            </div>`;
            if (orderArray.length > 0) {
                const orderTable = `
                    <table class="table is-fullwidth">
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
        fetchCustomerOrders(customerId); // Fetch and display customer orders
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
// // Send Token with hrefs
// document.addEventListener("DOMContentLoaded", function () {
//     const links = document.querySelectorAll('.send-token');

//     links.forEach(link => {
//         link.addEventListener('click', (event) => {
//             event.preventDefault(); // Prevent the default link behavior

//             const url = link.getAttribute('href'); // Get the URL from the href attribute
//             const token = localStorage.getItem('jwtToken'); // Get the JWT token from localStorage

//             // Check if the token exists
//             if (!token) {
//                 console.error('No token found. User may not be authenticated.');
//                 return; // Exit if no token is found
//             }

//             // Store the token in sessionStorage to use it in the next page
//             sessionStorage.setItem('jwtToken', token);

//             // Now navigate to the desired URL
//             window.location.href = url; // Redirect to the URL
//         });
//     });
// });





// async function apiFetch(url, options = {}) {
//     const token = localStorage.getItem('jwtToken');

//     const headers = {
//         'Content-Type': 'application/json',
//         ...options.headers,
//     };

//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }

//     const response = await fetch(url, {
//         ...options,
//         headers,
//     });

//     // Log the response status and text for debugging
//     console.log('Response Status:', response.status);
//     const responseText = await response.text(); // Read response as text
//     console.log('Response Text:', responseText); // Log the response text

//     // Check if response is ok before parsing as JSON
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     try {
//         return JSON.parse(responseText); // Attempt to parse the response as JSON
//     } catch (e) {
//         throw new Error('Failed to parse JSON: ' + e.message);
//     }
// }



