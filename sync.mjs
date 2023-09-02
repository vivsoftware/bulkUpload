import csvtojson from 'csvtojson';
import { FormData } from 'formdata-node';
import fetch, { blobFrom } from 'node-fetch';

const uploadedItemIds = [];
let raw;
function getdata(){
    raw = csvtojson().fromFile('./catDta.csv').then((result)=>{
        for(let i=0;i<result.length;i++){
            const product = result[i];
            const imageArr = product.image.split(',');
            for (let i = 0; i < imageArr.length; i++){
                const url = imageArr[i];
                console.log(url);
                if (!url) {
                    continue;
                  }
                const pathname = new URL(url).pathname;
                const segments = pathname.split('/');
                const filename = segments.pop();
                const form = new FormData();
                const temp =  fetch(url).then((res)=>{
                    res.blob().then((res)=>{
                        form.append( 'files',file, filename);
                    })
                    
                });
                const response =  fetch('http://127.0.0.1:1337/api/upload', {
                    headers: { 'Authorization': `bearer 63ccb815835796e1d72fdcc0c9d43a3e8e5cddfa6ef07564fd02c46b9906afcb77ce37c0391475a531a10d574202c7d2349d54ae6664edbd6ff03db290cb46c6c936b9842663a78ea8475491747a39f261fa02400a6fa0755f2c4717394872b2807932f58317d550d8932549109e586dba93bf7d6b2b29238398a907250e2cba` },
                    method: 'POST',
                    body: form,
                }).then((result)=>{
                    result.json().then((result)=>{
                        uploadedItemIds.push(result[0].id);
                    })
                })
            }
            const catArr = []
            product.display = uploadedItemIds.shift();
            product.gallery = uploadedItemIds;
            product.category = catArr.push(parseInt(product.category));
            const data = {
                "data": {
                "product_id": product.id,
                "product_type": product.type,
                "product_name": product.name,
                "product_description": product.description,
                "product_price": product.price,
                "product_display": product.display,
                "product_gallery": product.gallery,
                "category": catArr,
                    }
                }
            const entry =  fetch('http://127.0.0.1:1337/api/products', {
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(data)
            }).then((res)=>{
                res.json().then((result)=>{
                    console.log(result);
                })
            })
        }
    })  
}
getdata();


