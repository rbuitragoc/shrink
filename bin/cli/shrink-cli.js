const {shrink}  = require('../../routes/shrink');
const {retrieveStats, retrieveStatsReverse} = require('../../routes/stats');
const {doToggle, doToggleReverse} = require('../../routes/toggle');

const BASE_SHRINK_URL = 'http://shri.nk/';

const print_stats = function(jsonStats) {
  if (jsonStats) {
    console.log('Original URL:', jsonStats.source);
    console.log('Shrunk URL:', BASE_SHRINK_URL + jsonStats.id);
    console.log('Status:', jsonStats.status);
    console.log('Details');
    jsonStats.results.forEach(result => {
      console.log(' - [IP]', result.clientIp, '- [Date]:', result.requestDate, '- [Agent]:', result.userAgent);
    });
  }
}

const run_cli = async function(arguments) {
  const command = arguments[0];
  const url = arguments[1];
  const isShrunk = url.indexOf(BASE_SHRINK_URL) == 0;
  const id = isShrunk ? url.substring(BASE_SHRINK_URL.length) : '';
  
  switch (command) {
    case 'this:':
      const shrunkId = await shrink(url);
      console.log(BASE_SHRINK_URL + shrunkId);
      console.log('^^^^^^^^^^^^^^^^^^^^ - You see,' + url, 'shrank in a cool way.');
      break;
    case 'stats:':
      const stats = isShrunk ? await retrieveStats(id) : await retrieveStatsReverse(url);
      console.log(
        url, 
        isShrunk ? 'is a shrunk with id ' + id : 'is a source URL', 
        stats ? 'and we know all about it.' : 'but we cannot find data about it.');
      if (stats) print_stats(stats);
      break;
    case 'toggle:':
      const updatedShrunk = isShrunk ? await doToggle(id) : await doToggleReverse(url);
      const disabledMsg = 'disabled. HTTP Response Code 409 (conflict) is expected.';
      const enabledMsg = 'enabled. You will be redirected to ' + updatedShrunk.source + '.';
      console.log(
        BASE_SHRINK_URL + updatedShrunk.shrunkId, 
        '<- Updated to', 
        updatedShrunk.disabled ? disabledMsg : enabledMsg);
      break;
    default:
      console.log('Usage instructions coming soon.');
    }
  }
  
  const arguments = process.argv.slice(2);
  run_cli(arguments);