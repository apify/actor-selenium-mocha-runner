import { Actor } from 'apify';
import fs from 'fs';
import Mocha from 'mocha';

await Actor.init()

let { seleniumMochaCode } = await Actor.getInput();

seleniumMochaCode = seleniumMochaCode.replace('firefox', 'chrome');

fs.writeFileSync('test.cjs', seleniumMochaCode);

var mocha = new Mocha({});

mocha.addFile('./test.cjs')

mocha.run()
    .on('test', function(test) {
        console.log('Test started: '+test.title);
    })
    .on('test end', function(test) {
        console.log('Test done: '+test.title);
    })
    .on('pass', function(test) {
        console.log('Test passed');
        console.log(test);
    })
    .on('fail', function(test, err) {
        console.log('Test fail');
        console.log(test);
        console.log(err);
    })
    .on('end', function() {
        console.log('All done');
    });


// await Actor.exit();
