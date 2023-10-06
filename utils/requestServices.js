const axios = require('axios');

// Shopify API credentials
const apiKey = '59c5986dce87cdae69c2deedd2c3be24';
const accessToken = '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';
const shopDomain = 'returnx-test.myshopify.com'; // Replace with your actual shop domain

// API endpoint for fetching orders
const apiUrl = `https://${shopDomain}/admin/api/2021-10/orders.json`;


// Axios request configuration
const axiosConfig = {
  headers: {
    'X-Shopify-Access-Token': accessToken,
  },
};



// Fetch orders using Axios
exports.orders = () => {
axios.get(apiUrl, axiosConfig)
  .then(response => {
    const orders = response.data.orders;
    console.log('Orders:', orders);
  })
  .catch(error => {
    console.error('Error fetching orders:', error);
  });
}

exports.merchants = () => {
  const apiUrlMerch = `https://return-x.bubbleapps.io/version-live/api/1.1/wf/initiation`;

  const axiosConfigMerch = {
    headers: {
      'Authorization': 'Bearer 3c6da2551638a0b1ce21d7757a235430',
    },
    params: {
      'portal_slug': 'blancearth'
    }
  };

  axios.get(apiUrlMerch, axiosConfigMerch)
  .then(response => {
    const merchants = response.data.response;
    return merchants;
    console.log('merchants:', merchants);
  })
  .catch(error => {
    console.error('Error fetching :', error);
  });
}
