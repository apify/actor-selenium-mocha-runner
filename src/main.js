import { Actor } from 'apify';
import fs from 'fs';
import Mocha from 'mocha';

await Actor.init()

let { seleniumMochaCode, mochaTimeoutSecs } = await Actor.getInput();

seleniumMochaCode = seleniumMochaCode.replace('firefox', 'chrome');

fs.writeFileSync('test.cjs', seleniumMochaCode);

const mocha = new Mocha({});

if (mochaTimeoutSecs) mocha.timeout(mochaTimeoutSecs * 1000);

mocha.addFile('./test.cjs')

const mochaPromise = new Promise((resolve) => {
  mocha.run(() => resolve())
    .on('test', function(test) {
        console.log('Test started: ' + test.title);
    })
    .on('test end', function(test) {
        console.log('Test done: '+ test.title);
    })
    .on('pass', function(test) {
        console.log('Test passed');
    })
    .on('fail', function(test, err) {
        console.log('Test fail');
        console.log(err);
    })
    .on('end', function() {
        console.log('All done');
    });
});

await mochaPromise;
await Actor.exit();
