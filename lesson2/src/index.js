const app = require('./app/components/game.js');
 
(async function main() {
    let exit = false;
    while(!exit) {
        let fn = await app();
        if(fn === 'exit')
            exit = true;
    }
})();