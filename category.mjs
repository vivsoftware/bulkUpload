import csvtojson from 'csvtojson';
import { FormData } from 'formdata-node';
import fetch, { blobFrom } from 'node-fetch';

const uploadedItemIds = [];
let raw;
async function getdata(){
    raw = await csvtojson().fromFile('./catDta.csv');
    
        // const imageArr = product.image.split(',');
        // for (let i = 0; i < imageArr.length; i++){
        //     const url = imageArr[i];
        //     const pathname = new URL(url).pathname;
        //     const segments = pathname.split('/');
        //     const filename = segments.pop();

        //     const temp = await fetch(url);
        //     const file = await temp.blob();
        //     const form = new FormData();
        //     form.append( 'files',file, filename);

        //     const response = await fetch('http://127.0.0.1:1337/api/upload', {
        //             headers: { 'Authorization': `bearer 63ccb815835796e1d72fdcc0c9d43a3e8e5cddfa6ef07564fd02c46b9906afcb77ce37c0391475a531a10d574202c7d2349d54ae6664edbd6ff03db290cb46c6c936b9842663a78ea8475491747a39f261fa02400a6fa0755f2c4717394872b2807932f58317d550d8932549109e586dba93bf7d6b2b29238398a907250e2cba` },
        //             method: 'POST',
        //             body: form,
        //     })
        //     if (response.ok) {
        //         const jsonResponse = await response.json();
        //         console.log(jsonResponse[0].id + url);
        //         uploadedItemIds.push(jsonResponse[0].id);
        //     }
        // }
        // product.display = uploadedItemIds.shift();
        // product.gallery = uploadedItemIds;
        // product.category = [5];
        // product.brand = [10];
        const data = {
            "data": {
                "id": 14,
            "category_name": "Industrial Robots",
            }
    }

        const entry = await fetch('http://127.0.0.1:1337/api/categories', {
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(data)
        });
        const jsonResponse = await entry.json();
        console.log(jsonResponse);
    
    
}
getdata();


