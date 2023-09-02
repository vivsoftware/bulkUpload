import csvtojson from 'csvtojson';
import chalk from 'chalk';

const log = console.log;

const brokenUrls = [];
const data = await csvtojson().fromFile('./data/data.csv');

const promises = data.flatMap(product => {
  const image = product.image.split(',');
  return image.map(url => {
    return url ? fetch(url, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          log(chalk.yellow(`${url} is Working`))
        }
      })
      .catch(err => {
        log(chalk.blue(product.id));
        brokenUrls.push(url)
      }) : Promise.resolve();
  });
});

Promise.all(promises).then(() => {
  console.log(brokenUrls);
});
