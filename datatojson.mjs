import csvtojson from 'csvtojson';
import { FormData } from 'formdata-node';
import fetch, { blobFrom } from 'node-fetch';

const uploadedItemIds = [];
async function getdata(){
    const raw = await csvtojson().fromFile('./data/data.csv').then((result)=>{
        // console.log(result);
        // console.log(result[0].image);
        const imageArr = result[0].image.split(',');
        imageArr.map(async(url)=>{
                  const temp = await fetch(url);
                  const file = await temp.blob();
                  const form = new FormData();
                  form.append( 'files',file, "2.png");
                  const response = await fetch('http://3.110.105.128:1337/api/upload', {
                    headers: { Authorization: `bearer 63ccb815835796e1d72fdcc0c9d43a3e8e5cddfa6ef07564fd02c46b9906afcb77ce37c0391475a531a10d574202c7d2349d54ae6664edbd6ff03db290cb46c6c936b9842663a78ea8475491747a39f261fa02400a6fa0755f2c4717394872b2807932f58317d550d8932549109e586dba93bf7d6b2b29238398a907250e2cba` },
                    method: 'POST',
                    body: form,
                  });
                  if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse[0].id);
                    uploadedItemIds.push(jsonResponse[0].id);
                    console.log(uploadedItemIds);
                  }
        })

    })
    console.log(uploadedItemIds);
}
getdata();
