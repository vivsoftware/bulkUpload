import csvtojson from 'csvtojson';
import { FormData } from 'formdata-node';
import fetch, { blobFrom } from 'node-fetch';
// import axios from 'axios';


let k = 6;
const data1 = await csvtojson().fromFile('./data/Test.csv');
for (let i = 4; i < data1.length; i++) {
    const uploadedItemIds = [];
    const product = data1[i];
    const imageArr = product.image.split(',');
    for (let j = 0; j < imageArr.length; j++) {
        const url = imageArr[j]
        if (url) {
            const pathname = new URL(url).pathname;
            const segments = pathname.split('/');
            const filename = segments.pop();
            const temp = await fetch(url);
            const file = await temp.blob();
            const form = new FormData();
            form.append('files', file, filename);
            
            const response = await fetch('https://strapi.unboxindustry.com/api/upload', {
                headers: { 'Authorization': `bearer bca0141e6abfd3be94089ccd89e27fa0fc308f7ce495ef38e89a70be7114b0e260174f56c9d3405d4026060f4642be4f1f72e4648d4d0963704d9a0afedaf1158878cf375bc1b62592ae853a6763209cd25bc6a87ea1413f3af08c736e77d3f662530dfeeeae398bf87dea2d37100da1a9970da87dac921440fc0164cc9ac491` },
                method: 'POST',
                body: form,
                // redirect: 'follow',     // Set to `manual` to extract redirect headers, `error` to reject redirect
                follow: 2000,             // maximum redirect count. 0 to not follow redirect

            }).catch((err) => {
                console.log(err);
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(`image uploaded id: ${jsonResponse[0].id} URL ${url}`);
                uploadedItemIds.push(jsonResponse[0].id);
            }
        }

    }
    const catArr = []
    product.display = uploadedItemIds.shift();
    product.category = catArr.push(parseInt(product.categories));
    const mdata = {
        "data": {
            "id": k,
            "product_id": product.id,
            "product_type": product.type,
            "product_name": product.name,
            "product_description": product.description,
            "product_price": product.price || null,
            "product_display": product.display || null,
            "product_gallery": uploadedItemIds ? uploadedItemIds : null,
            "category": catArr,
            "SEO": {
                "metaTitle": product.metaTitle,
                "metaDescription": product.metaDescription,
                "metaImage": product.display,
                // "keywords": product.keywords




            }
        }
    }
  
    const entry = await fetch('https://strapi.unboxindustry.com/api/products', {
        headers: { 
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(mdata)
    });

    const item = await entry.json();
    console.log(item)
    k++;

}