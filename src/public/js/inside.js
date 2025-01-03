const customerGroups = [13, 16, 17, 18, 19, 20, 21, 27];
const loadingAnimation = ` <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

    <dotlottie-player src="https://lottie.host/4cb34855-b2b5-484b-a16e-98d45e9299dc/2GtX5kqon8.json" background="transparent" speed="1" style="width: 150px; height: 150px; margin:auto;" loop autoplay></dotlottie-player>`;

const apiKey = 'GHMT1WJFQELIF4HKEBZZ1UELCX9F98MG';
let modalContent = document.querySelector('#mainmodal .modal-content');
document.addEventListener('DOMContentLoaded', function () {
  modalContent = document.querySelector('#mainmodal .modal-content');
});
async function fetchOrderDetailsJson(orderId) {
  const apiUrl = `https://www.consogarage.com/api/orders/${orderId}?ws_key=safelysubmit&output_format=JSON`;
  // const apiUrl = `/webservice/`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      `Error fetching order details for Order ID ${orderId}:`,
      error
    );
  }
}
document.addEventListener('DOMContentLoaded', function () {
  initModalTriggers();

  // Function to generate CSV content, including products
  function generateCSVWithProducts(orders) {
    const headers = [
      'Order ID',
      'Total Paid',
      'Order Date',
      'Product ID',
      'Product Attribute ID',
      'Product Name',
      'Product Quantity',
      'Product Reference',
      'Product Price',
      'Unit Price (incl. tax)',
      'Unit Price (excl. tax)',
    ];

    const csvRows = [headers.join(',')];

    orders.forEach(order => {
      order.products.forEach(product => {
        const row = [
          order.orderId,
          order.totalPaid.toFixed(2),
          order.dateAdded,
          product.product_id,
          product.product_attribute_id,
          product.product_name,
          product.product_quantity,
          product.product_reference,
          parseFloat(product.product_price).toFixed(2),
          parseFloat(product.unit_price_tax_incl).toFixed(2),
          parseFloat(product.unit_price_tax_excl).toFixed(2),
        ];
        csvRows.push(row.join(','));
      });
    });

    return csvRows.join('\n');
  }

  // Function to download the CSV file
  // function downloadCSV(csvContent, filename) {
  //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //     const link = document.createElement('a');
  //     const url = URL.createObjectURL(blob);

  //     link.setAttribute('href', url);
  //     link.setAttribute('download', filename);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  // }

  async function fetchOrderDetails(orderId) {
    const apiUrl = `https://www.consogarage.com/api/orders/${orderId}?ws_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.text(); // Get response as text
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'application/xml');

      // Retrieve total_paid and date_add from the order details
      const totalPaidElement = xmlDoc.getElementsByTagName('total_paid')[0];
      const dateAddedElement = xmlDoc.getElementsByTagName('date_add')[0];

      const totalPaid = totalPaidElement ? totalPaidElement.textContent : '';
      const dateAdded = dateAddedElement ? dateAddedElement.textContent : '';

      return { totalPaid, dateAdded };
    } catch (error) {
      console.error(
        `Error fetching order details for Order ID ${orderId}:`,
        error
      );
      return { totalPaid: 'N/A', dateAdded: 'N/A' }; // Return N/A on error
    }
  }

  function openModal($el, customerId) {
    $el.classList.add('is-active');
    // fetchCustomerOrders(customerId);
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
    modalContent.innerHTML = loadingAnimation;
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach($modal => {
      closeModal($modal);
    });
  }

  function initModalTriggers() {
    (document.querySelectorAll('.js-modal-trigger') || []).forEach($trigger => {
      const modalId = $trigger.dataset.target;
      const $target = document.getElementById(modalId);
      const customerId = $trigger.dataset.customerId; // Get the customer ID from the button

      $trigger.addEventListener('click', () => {
        openModal($target, customerId); // Pass the customer ID to openModal
      });
    });

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button'
      ) || []
    ).forEach($close => {
      const $target = $close.closest('.modal');

      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    });
  }
});
const computer = {
  dateFr: dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with 0 if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-11) and pad with 0
    const year = date.getFullYear(); // Get the year
    return `${day}/${month}/${year}`; // Return formatted date as DD/MM/YYYY
  },
};

// Add event listeners to all links that should call the fetch function
document.addEventListener('DOMContentLoaded', () => {
  // Select all the links you want to bind the function to
  initProtectedLinks();
});
function initProtectedLinks() {
  const protectedLinks = document.querySelectorAll('.protected-link');

  // Add click event listeners to those links
  protectedLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // Prevent default link behavior
      alert('ok');
      const url = event.target.getAttribute('href'); // Get the URL from the link
      fetchProtectedPage(url); // Call the fetch function with the URL
    });
  });
}

// function getFilteredItalCustomers() {
//   // alert('ital');
//   const selectedSector = document.querySelector(
//     '#sector-selector select'
//   ).value;
//   const searchName = document.querySelector('input[name="nom"]').value;
//   const searchCompany = document.querySelector('input[name="societe"]').value;
//   const searchEmail = document.querySelector('input[name="email"]').value;
//   const searchCodeItal = document.querySelector('input[name="codeital"]').value;
//   const searchZipcode = document.querySelector('input[name="zipcode"]').value;

//   location.href = `/ital-clients?sector=${selectedSector}&name=${encodeURIComponent(searchName)}&company=${encodeURIComponent(searchCompany)}&email=${encodeURIComponent(searchEmail)}&code=${encodeURIComponent(searchCodeItal)}&zipcode=${encodeURIComponent(searchZipcode)}`;
// }
// document.addEventListener('DOMContentLoaded', function () {
//   const filterBtn = document.querySelector('#ital-customer-filter');
//   if (filterBtn) {
//     filterBtn.addEventListener('click', getFilteredItalCustomers);
//     document.addEventListener('keydown', event => {
//       if (event.key === 'Enter') {
//         filterBtn.click();
//       }
//     });
//   }
// });
// Handle customer filters all at once
document.addEventListener('DOMContentLoaded', function () {
  let formData = {};
  const existingValues = Array.from(
    document.querySelectorAll('input[value]')
  ).filter(input => input.value.trim() !== '');
  existingValues.forEach(oneInput => {
    console.log(oneInput.name);
    formData = {
      ...formData,
      [oneInput.name]: oneInput.value,
    };
  });
  const customerFilterInputs = document.querySelectorAll(
    '#customerFilters input, #customerFilters select'
  );

  customerFilterInputs.forEach(input => {
    input.addEventListener('input', () => {
      formData[input.name] = input.value;
      // Get order filter if set
      const checkedOrderRadio = document.querySelector(
        'input[name="order"]:checked'
      );
      if (checkedOrderRadio) {
        formData['order'] = checkedOrderRadio.value;
        formData['orderAttribute'] = checkedOrderRadio.dataset.orderattribute;
      }

      console.log('Updated formData:', formData);

      const hasValue = Object.values(formData).some(
        value => value !== '' && value !== null && value !== undefined
      );
      // const clearBtn = document.querySelector('#ital-customer-filter-reset');
      // const validBtn = document.querySelector('#ital-customer-filter');
      // if (hasValue || window.location.search) {
      //   clearBtn.style.display = 'block';
      //   validBtn.style.display = 'block';
      // } else {
      //   clearBtn.style.display = 'none';
      //   validBtn.style.display = 'none';
      // }
      if (formData.length > 1) {
      }
    });
  });
  const filterBtn = document.querySelector('#ital-customer-filter');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      location.href = `/ital-clients?name=${encodeURIComponent(formData.nom || '')}&company=${encodeURIComponent(formData.societe || '')}&email=${encodeURIComponent(formData.email || '')}&code=${encodeURIComponent(formData.codeital || '')}&zipcode=${encodeURIComponent(formData.zipcode || '')}&sector=${encodeURIComponent(formData.sector || '')}&order=${encodeURIComponent(formData.order || '')}&orderattribute=${encodeURIComponent(formData.orderAttribute || '')}`;
    });
  }
});

async function fetchAndDownloadCSV() {
  // Get all order links
  const orders = document.querySelectorAll('#customer-orders td a');
  let allCsvContent = ''; // Variable to accumulate CSV content from all orders

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
    'Prix unitaire HT',
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
          productPrice,
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
// expand blocks
document.addEventListener('DOMContentLoaded', function () {
  const expands = document.querySelectorAll('.expand');
  if (expands) {
    expands.forEach(expand => {
      const button = expand.querySelector('.button');
      if (button) {
        button.addEventListener('click', () => {
          console.log('alert');
          button.closest('.expand').classList.toggle('expanded'); // Toggle expanded class
        });
      }
    });
  }
});

// Loader on page change
document.addEventListener('DOMContentLoaded', function () {
  const navitems = document.querySelectorAll('aside .menu-list a');
  if (navitems) {
    navitems.forEach(navitem => {
      navitem.addEventListener('click', () => {
        // alert('click');
        const target = document.querySelector('#maincontainer main');
        target.innerHTML = `<video loop autoplay muted style="width:150px;height:150px;margin:auto;">
    <source src="img/loading-Inside.webm" type="video/webm">
    Your browser does not support the video tag.
</video>`;
      });
    });
  }
});

// Open quotations filter
document.addEventListener('DOMContentLoaded', function () {
  const toggler = document.querySelector('#filter-quotations-toggle');
  if (toggler) {
    toggler.addEventListener('click', () => {
      let htmlContent = '';
      async function gethtmlContent() {
        const sector = toggler.dataset.sector;
        const response = await fetch('../html/quoteFilters.html');
        if (!response.ok) throw new Error('Failed to load HTML file');
        htmlContent = await response.text();
        modalContent.innerHTML = htmlContent;
      }

      gethtmlContent()
        .then(() => {
          // Initialize the form only after the content has loaded
          initQuoteFilterForm();
        })
        .catch(error => console.error(error));
    });
  }
});

function initQuoteFilterForm() {
  const form = document.querySelector('form[action="devis"]');
  console.log('form:', form);
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statuses = [];
      form.querySelectorAll('input[name="status"]:checked').forEach(item => {
        statuses.push(item.value);
      });

      const toggler = document.querySelector('#filter-quotations-toggle');
      const sector = toggler.dataset.sector;

      // Ajoute 'sector' et 'status' aux paramètres de la requête
      const queryString = new URLSearchParams({
        customergroups: sector,
        status: JSON.stringify(statuses),
      }).toString();
      // alert(`${form.action}?${queryString}`)
      window.location.href = `${form.action}?${queryString}`;
    });
  }
}

// Open customer orders modal (ital)

document.addEventListener('DOMContentLoaded', function () {
  const togglers = document.querySelectorAll('.open-customer-orders-modal');
  const modalContent = document.querySelector('#mainmodal .modal-content'); // Assuming modal content has this ID

  togglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
      const customerId = toggler.dataset.customerid;

      // Attach event listener to the form inside the modal
      modalContent.addEventListener('submit', event => {
        event.preventDefault();

        const fromDate = document.querySelector('#from-date').value;
        const toDate = document.querySelector('#to-date').value;

        fetchCustomerOrders(customerId, fromDate, toDate);
        console.log(`from : ${fromDate} to : ${toDate}`);
      });

      // Initial fetch without date filters
      fetchCustomerOrders(customerId);
    });
  });

  async function fetchCustomerOrders(
    customerId,
    fromDate = null,
    toDate = null
  ) {
    // let apiUrl = `https://www.consogarage.com/api/orders?ws_key=${apiKey}&filter[id_customer]=[${customerId}]&filter[valid]=[1]&display=full&sort=[id_DESC]&output_format=JSON`;
    let apiUrl = `/webservice/customerorders/${customerId}?1=1`;

    // Add date filters if provided
    if (fromDate) apiUrl += `&fromdate=${fromDate}`;
    if (toDate) apiUrl += `&todate=${toDate}`;
    console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error('Network response was not ok ' + response.statusText);

      const data = await response.json();
      const orders = data.orders || [];
      let totalOrders = 0;
      let countOrders = 0;

      const orderArray = orders.map(order => {
        const orderId = order.orderId || 'N/A';
        const totalPaid = parseFloat(order.totalPaid) || 0;
        const totalArticles = parseFloat(order.totalArticles).toFixed(2);
        const totalShipping = parseFloat(order.totalShipping).toFixed(2);
        const dateAdded = order.dateAdded || 'N/A';

        totalOrders += totalPaid;
        countOrders++;

        return {
          orderId,
          totalPaid,
          totalArticles,
          totalShipping,
          dateAdded,
          products: order.products || [],
        };
      });

      // Update modal content with filtered orders
      modalContent.innerHTML = `
                <div class="columns">
                    <h2 class="subtitle column">Id client : ${customerId}</h2>
                    <div class="column is-6">
                        <form id="date-filter-form" action="#" method="POST" class="columns is-multiline">
                            <div class="field column is-6">
                                <label class="label" for="from-date">Depuis:</label>
                                <div class="control">
                                    <input class="input" type="date" id="from-date" name="from-date" value="${fromDate || ''}">
                                </div>
                            </div>

                            <div class="field column is-6">
                                <label class="label" for="to-date">Jusqu'à :</label>
                                <div class="control">
                                    <input class="input" type="date" id="to-date" name="to-date" value="${toDate || ''}">
                                </div>
                            </div>
                            <div class="field column is-12">
                                <div class="control is-fullwidth">
                                    <button class="button is-primary is-small is-fullwidth" type="submit">Chercher</button>
                                </div>
                            </div>
                        </form>
                        <div class="field column is-12">
                                <div class="control is-fullwidth">
                                    <button id="reset-date-filters" class="button is-warning is-small is-fullwidth"onclick="resetDateFilters()">Clear</button>
                                </div>
                            </div>
                        <br/><strong>${countOrders}</strong> commande${countOrders > 1 ? 's' : ''}</div>
                    <div class="column has-text-right">Total : <br/>${totalOrders.toFixed(2)} €</div>
                </div>
                <div class="has-text-right">
                    <button id="xls-dowloader" class="button has-text-success">
                        <i class="fas fa-file-csv"></i>
                    </button>
                </div>`;

      if (orderArray.length > 0) {
        console.log(JSON.stringify(orderArray));
        const orderTable = `
                    <table id="customer-orders" class="table is-fullwidth">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total articles</th>
                                <th>Frais de port</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderArray
                              .map(
                                order => `
                                <tr>
                                    <td>${order.orderId}</td>
                                    <td>${order.dateAdded}</td>
                                    <td class="has-text-right">${order.totalArticles}</td>
                                    <td class="has-text-right">${order.totalShipping}</td>
                                </tr>`
                              )
                              .join('')}
                        </tbody>
                    </table>`;
        modalContent.innerHTML += orderTable;
      } else {
        modalContent.innerHTML += `<p class="has-text-centered has-text-warning">Aucune commande trouvée.</p>`;
      }

      // Attach CSV download functionality
      // const csvDownloader = document.querySelector('#csv-dowloader');
      // csvDownloader.addEventListener('click', () => {
      //     const csvContent = generateCSVWithProducts(orderArray);
      //     downloadCSV(csvContent, `Commandes_idclient_${customerId}.csv`);
      // });
      function generateXLSXWithProducts(orders) {
        // Define headers
        const headers = [
          'N° Cde',
          'Date Cde',
          'Montant Cde (€ HT)',
          'Port sur Cde (€ HT)',
          'Réf. Produit',
          'Désignation Produit',
          'Prix unitaire (€ HT)',
          'Qté Cdée',
          'Montant Produit Cdé (€ HT)',
        ];

        // Create an array of rows with the headers and order data
        const data = [headers];

        orders.forEach(order => {
          order.products.forEach(product => {
            const date = new Date(order.dateAdded);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            const row = [
              order.orderId,
              formattedDate,
              (
                parseFloat(order.totalArticles) +
                parseFloat(order.totalShipping)
              )
                .toFixed(2)
                .replace('.', ','),
              parseFloat(order.totalShipping).toFixed(2).replace('.', ','),
              product.product_reference,
              product.product_name,
              parseFloat(product.unit_price_tax_excl)
                .toFixed(2)
                .replace('.', ','),
              product.product_quantity,
              parseFloat(product.total_price_tax_excl)
                .toFixed(2)
                .replace('.', ','),
            ];
            data.push(row);
          });
        });

        // Create a new workbook and add the data to a worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');

        // Convert the workbook to a binary string and trigger download
        XLSX.writeFile(
          workbook,
          `Customer-${customerId}_Orders_with_Products.xlsx`
        );
      }
      const xlsDownloader = document.querySelector('#xls-dowloader');
      xlsDownloader.addEventListener('click', () => {
        console.log(orderArray);
        generateXLSXWithProducts(orderArray);
      });
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  }
});

// Open propspect order modal (ital)
document.addEventListener('DOMContentLoaded', function () {
  const togglers = document.querySelectorAll('.open-prospect-order-modal');
  togglers.forEach(toggler => {
    toggler.addEventListener('click', async () => {
      const orderId = toggler.dataset.orderid;
      try {
        const response = await fetchOrderDetailsJson(orderId);
        const orderDetail = response.order;
        console.log(orderDetail.associations.order_rows);
        modalContent.innerHTML = ``;
        orderDetail.associations.order_rows.forEach(product => {
          modalContent.innerHTML += `${product.product_name}<hr/>`;
        });
      } catch (e) {
        console.log('erreur lors de la récupération de la commande');
      }
      // Reset date filters
      // function initResetDateFilters() {
      //   const resetButton = document.querySelector('#reset-date-filters');
      //   resetButton.addEventListener('click', () => {
      //     console.log('click');
      //     const inputsToReset = document.querySelectorAll(
      //       '#from-date, #to-date'
      //     );
      //     inputsToReset.forEach(input => {
      //       input.value = '';
      //     });
      //   });
      // }
      // initResetDateFilters();
    });
  });
});
function getURLParameter(url, name) {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get(name);
}

// Quotations details in the modal
document.addEventListener('DOMContentLoaded', function () {
  const quoteTogglers = document.querySelectorAll(
    'button[data-action="show-quote-detail"]'
  );
  if (quoteTogglers) {
    quoteTogglers.forEach(toggler => {
      // const quoteId = toggler.dataset.quoteid;
      // console.log
      toggler.addEventListener('click', () => {
        const quoteId = toggler.dataset.quoteid;
        getQuoteDetails(quoteId);
      });
    });
  }
  async function getQuoteDetails(quoteId) {
    const apiUrl = `https://www.consogarage.com/consogarage-api/api/quotations.php?id=${quoteId}`;
    console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error('Network response was not ok ' + response.statusText);

      const data = await response.json();
      console.log(data[0]);

      // Clear the modal content
      modalContent.innerHTML = '';

      // Build the table as a single string
      let tableHTML = `
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>PUHT</th>
                            <th>Quantité</th>
                            <th>Total HT</th>
                        </tr>
                    </thead>
                    <tbody>`;

      // Loop through products and add rows
      data[0].products.forEach(product => {
        const unitPriceExcl = parseFloat(product.unit_price_tax_excl) || 0; // Fallback to 0 if invalid
        const quantity = parseInt(product.product_quantity) || 0; // Fallback to 0 if invalid
        const totalHT = unitPriceExcl * quantity;

        tableHTML += `
                    <tr>
                        <td>${product.product_name}</td>
                        <td>${unitPriceExcl.toFixed(2)}</td>
                        <td>${quantity}</td>
                        <td>${totalHT.toFixed(2)}</td>
                    </tr>`;
      });

      // Close the table
      tableHTML += `</tbody></table>`;

      // Set the entire table HTML to modalContent at once
      modalContent.innerHTML = tableHTML;
    } catch (e) {
      console.error('Error fetching quotation details:', e);
    }
  }
});

function deleteUser(userId) {
  fetch(`/utilisateurs/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        alert(`User ${userId} deleted successfully.`);
        const userCard = document.querySelector(`#user${userId}`);

        userCard.style.animation = 'zoomOut 0.5s forwards';

        // Wait for the animation to complete, then remove the element
        userCard.addEventListener('animationend', () => {
          userCard.remove();
        });
        // userCard.remove();
      } else {
        console.error('Failed to delete user:', response.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
function resetDateFilters() {
  console.log('click');
  const inputsToReset = document.querySelectorAll('#from-date, #to-date');
  inputsToReset.forEach(input => {
    input.value = '';
  });
}
