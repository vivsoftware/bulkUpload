import csvtojson from 'csvtojson';
import chalk from 'chalk';

const log = console.log;

const brokenUrls = [];
const data = await csvtojson().fromFile('./data/catDta.csv');
for(let i =0; i<data.length; i++){
    const product = data[i];
    const image = product.image.split(',');
    for(let i = 0; i<image.length; i++){
        const url = image[i];
        fetch(url,{method:'HEAD'}).then((res)=>{
            if(res.ok){
                log(chalk.yellow(`${url} is Working`))
            }
        }).catch((err)=>{
            log(chalk.red(err))
            brokenUrls.push(url);
        })
    }
}



