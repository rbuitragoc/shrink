const {shrink}  = require('../../routes/shrink');
const {retrieveStats, retrieveStatsReverse} = require('../../routes/stats');

const BASE_SHRINK_URL = 'http://shri.nk/';

const print_stats = function(jsonStats) {
  if (jsonStats) {
    console.log('Status:', jsonStats.status);
    console.log('Details');
    jsonStats.results.forEach(result => {
      console.log(' - [IP]', result.clientIp, '- [Date]:', result.requestDate, '- [Agent]:', result.userAgent);
    });
  }
}

const run_cli = async function(arguments) {
  
  switch (arguments[0]) {
    case 'this:':
      const shrunkId = await shrink(arguments[1]);
      console.log(BASE_SHRINK_URL + shrunkId);
      console.log('^^^^^^^^^^^^^^^^^^^^ - You see,' + arguments[1], 'shrank in a cool way.');
      break;
    case 'stats:':
      const url = arguments[1];
      const isShrunk = url.indexOf(BASE_SHRINK_URL) == 0;
      const id = isShrunk ? url.substring(BASE_SHRINK_URL.length) : '';
      const stats = isShrunk ? await retrieveStats(id) : await retrieveStatsReverse(url);
      console.log(
        url, 
        isShrunk ? 'is a shrunk with id ' + id : 'is a source URL', 
        stats ? 'and we know all about it.' : 'but we cannot find data about it.');
      if (stats) print_stats(stats);
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