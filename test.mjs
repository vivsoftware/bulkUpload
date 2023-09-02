// import csvtojson from 'csvtojson';
// import { FormData } from 'formdata-node';
// import fetch from 'node-fetch';


// let k = 0;
// const data1 = await csvtojson().fromFile('./data/Test (1).csv');
// for (let i = 0; i < data1.length; i++) {
//     const uploadedItemIds = [];
//     const product = data1[i];
//     const imageArr = product.image.split(',');
//     for (let j = 0; j < imageArr.length; j++) {
//         const url = imageArr[j]
//         if (url) {
//             const pathname = new URL(url).pathname;
//             const segments = pathname.split('/');
//             const filename = segments.pop();
//             const temp = await fetch(url);
//             const file = await temp.blob();
//             const form = new FormData();
//             form.append('files', file, filename);

//             const response = await fetch('https://strapi.unboxindustry.com/api/upload', {
//                 // const response = await fetch('http://159.89.162.141:1337/api/upload', {
//                 // 7eceecd7fe5a165b97499afa7cfcc5c77cb5ad62cab65ccd9c99076f837b4f21d369bb5e03c2373e1b85e52d83682b2b951995c9abb540da6f8de9c8a102123661795e0dd00d44a0e29b8adee16313d3dd23714041f3ca778318b6f77e1c2c47cb498097e32b9983a5b27bb18d1bb2119ce3bf49a3c64f25aba3919fc389d71d
//                 // const response = await fetch('http://teststrapi.unboxindustry.com/api/upload', {

//                 //test strapi
//                 // headers: { 'Authorization': `bearer c7d59f4293fed4a57f5c84879eaf49d37646c3b13e93cccc83f5951c9b08a22c2e81b0dc3b373cfe2e024e2f52fe84107ec4f718f7086727b81521dca37ca1d7cf7de48c62bea6dd426012b29ec11727db7e6a60974457c7318093d458de96f4fab50f0816353dbc36df10ef7d95ef6514ab0d5dd7fe7e52c1104be243916e51` },
//                 //main strapi
//                 headers: { 'Authorization': `bearer 98bf564d1c6abbe92c0be3cf7133bfd2e8a70fe9f57fd6cb5fef82bfd16ab3f5e9493a5d38e5f6c1a3fdcb74090731615f031ae298dd8af33030cee3ad5357bab2c584a09f1a3d72d461aa7800ad223e3d13a931e90c7c8ea7e03f3398095da0dca07dcbfd71086b21cbaf5b7ac8c98e8fb4ea12684052fa111cbb024560c849` },

//                 method: 'POST',
//                 body: form,
//             }).catch((err) => {
//                 console.log(err);
//             })
//             if (response.ok) {
//                 const jsonResponse = await response.json();
//                 uploadedItemIds.push(jsonResponse[0].id);
//             }
//         }

//     }


//     const catArr = []
//     const brarr = []

//     product.display = uploadedItemIds.shift();
//     const productGallery = uploadedItemIds.length > 0 ? uploadedItemIds : null;

//     product.category = catArr.push(parseInt(product.category));
//     product.brands = brarr.push(parseInt(product.brands));

//     // console.log(product);
//     const mdata = {
//         "data": {
//             "product_type": product.type,
//             "product_name": product.name,

//             "products_description": product.products_description,
//             "product_short_description": product.product_short_description,

//             "product_price": product.price || null,
//             "product_display": product.display || null,
//             // "product_gallery": uploadedItemIds ? uploadedItemIds : null,
//             "product_gallery": productGallery,

//             "category": catArr,
//             "brand": brarr,
//             "Product_Video1": product.Product_Video1,
//             "Product_Video2": product.Product_Video2,
//             "Product_Video3": product.Product_Video3,
//             "Product_Video4": product.Product_Video4,

//             // "Specifications[0]": {
//             //      " Cobot-Fields" : {
//             //     // "Reach": product.reach,
//             //     // "Max_payload": product.max_payload,
//             //     "Joint_Speed":product.linear_speed,

//             // },

//             // },
//             "product_gallery": product.display || null,
//             "SEO": {
//                 "metaTitle": product.metaTitle,
//                 "metaDescription": product.metaDescription,
//                 "metaImage": product.display,
//                 // "keywords": product.keywords




//             }
//         }
//     }
//     const entry = await fetch('https://strapi.unboxindustry.com/api/products', {

//         // const entry = await fetch('http://159.89.162.141:1337/api/products', {
//         // const entry = await fetch('https://strapi.unboxindustry.com/api/products', {
//         // https://teststrapi.unboxindustry.com/admin/settings/api-tokens/1
//         // const entry = await fetch('http://teststrapi.unboxindustry.com/api/products', {

//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify(mdata)
//     });
//     const item = await entry.json();
//     console.log(item)

// }


import csvtojson from 'csvtojson';
import { FormData } from 'formdata-node';
import fetch from 'node-fetch';

(async () => {
    try {
        let k = 0;
        const data1 = await csvtojson().fromFile('./data/Di-Soric Data - Sheet1 (9).csv');
        for (let i = 0; i < data1.length; i++) {
            const uploadedItemIds = [];
            const product = data1[i];
            const imageArr = product.image.split(',');3333
            for (let j = 0; j < imageArr.length; j++) {
                const url = imageArr[j].trim();
                if (url) {
                    const temp = await fetch(url);
                    const file = await temp.blob();
                    const filename = url.substring(url.lastIndexOf('/') + 1);
                    const form = new FormData();
                    form.append('files', file, filename);
                    // const response = await fetch('http://159.89.162.141:1337/api/upload', {

                        const response = await fetch('https://strapi.unboxindustry.com/api/upload', {
                        // headers: { 'Authorization': `bearer c7d59f4293fed4a57f5c84879eaf49d37646c3b13e93cccc83f5951c9b08a22c2e81b0dc3b373cfe2e024e2f52fe84107ec4f718f7086727b81521dca37ca1d7cf7de48c62bea6dd426012b29ec11727db7e6a60974457c7318093d458de96f4fab50f0816353dbc36df10ef7d95ef6514ab0d5dd7fe7e52c1104be243916e51` },

                        headers: { 'Authorization': `bearer 98bf564d1c6abbe92c0be3cf7133bfd2e8a70fe9f57fd6cb5fef82bfd16ab3f5e9493a5d38e5f6c1a3fdcb74090731615f031ae298dd8af33030cee3ad5357bab2c584a09f1a3d72d461aa7800ad223e3d13a931e90c7c8ea7e03f3398095da0dca07dcbfd71086b21cbaf5b7ac8c98e8fb4ea12684052fa111cbb024560c849` },
                        method: 'POST',
                        body: form,
                    });

                    if (response.ok) {
                        const jsonResponse = await response.json();
                        uploadedItemIds.push(jsonResponse[0].id);
                    }
                }
            }

            const catArr = [parseInt(product.category)];
            const brarr = [parseInt(product.brands)];

            product.display = uploadedItemIds.shift();

            // Handle product_gallery field
            const productGallery = uploadedItemIds.length > 0 ? uploadedItemIds : null;

            const mdata = {
                "data": {
                    // ... your data fields here ...
                    "product_gallery": productGallery,


                    "product_type": product.type,
                    "product_name": product.name,

                    "products_description": product.products_description,
                    "product_short_description": product.product_short_description,

                    "product_price": product.price || null,
                    "product_display": product.display || null,
                    // "product_gallery": uploadedItemIds ? uploadedItemIds : null,
                    // "product_gallery": productGallery,

                    "category": catArr,
                    "brand": brarr,
                    "Product_Video1": product.Product_Video1,
                    "Product_Video2": product.Product_Video2,
                    "Product_Video3": product.Product_Video3,
                    "Product_Video4": product.Product_Video4,

                    // "Specifications[0]": {
                    //      " Cobot-Fields" : {
                    //     // "Reach": product.reach,
                    //     // "Max_payload": product.max_payload,
                    //     "Joint_Speed":product.linear_speed,

                    // },

                    // },
                    // "product_gallery": product.display || null,
                    "SEO": {
                        "metaTitle": product.metaTitle,
                        "metaDescription": product.metaDescription,
                        "metaImage": product.display
                        //                 // "keywords": product.keywords




                    }
                }
            };

                    // const entry = await fetch('http://159.89.162.141:1337/api/products', {

            const entry = await fetch('https://strapi.unboxindustry.com/api/products', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(mdata)
            });

            if (entry.ok) {
                console.log('Please wait..............');

                const item = await entry.json();
                console.log(item);
                console.log('Please wait..............');

            } else {
                console.log('Failed to create product:', entry.statusText);
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
    console.log('Please wait..............');

})();
