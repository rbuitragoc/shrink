const shrink = require('../../routes/shrink').shrink;


const run_cli = async function(arguments) {
    
    switch (arguments[0]) {
    case 'this:':
        const shrunkId = await shrink(arguments[1]);
        console.log('http://shri.nk/' + shrunkId);
        console.log('^^^^^^^^^^^^^^^^^^^^ - You see,' + arguments[1], 'shrank in a cool way.');
        break;
    case 'stats:':
        console.log(arguments[1], 'is either a source URL or a shrunk and we know all about it.');
        break;
    case 'toggle:':
        console.log(arguments[1], 'will be disabled or enabled, it depends.');
        break;
    default:
        console.log('Usage instructions coming soon.');
    }
}

const arguments = process.argv.slice(2);
console.log('Shrink URLs. Received args: ', arguments);
run_cli(arguments);