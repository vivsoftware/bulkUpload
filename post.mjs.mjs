import csvtojson from 'csvtojson';
// import { FormData } from 'formdata-node';
// import fetch, { blobFrom } from 'node-fetch';

import axios from 'axios';


// const data = await csvtojson().fromFile('./data/data.csv');

axios
  .post('http://3.110.105.128:1337/api/products', {
    data: {
        "product_type": product.type,
        "product_name": product.name,
        "product_description": product.description,
        "product_price": product.price || null,
        "product_display": product.display || null,
        "product_gallery": uploadedItemIds ? uploadedItemIds : null,
        "category": catArr
    },
  })
  .then(response => {
    console.log(response);
  });