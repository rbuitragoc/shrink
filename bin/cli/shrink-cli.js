var myArgs = process.argv.slice(2);
console.log('Shrink URLs. Received args: ', myArgs);

switch (myArgs[0]) {
case 'this:':
    console.log(myArgs[1], 'shrank in a cool way.');
    break;
case 'stats:':
    console.log(myArgs[1], 'is either a source URL or a shrunk and we know all about it.');
    break;
case 'toggle:':
    console.log(myArgs[1], 'will be disabled or enabled, it depends.');
    break;
default:
    console.log('Usage instructions coming soon.');
}