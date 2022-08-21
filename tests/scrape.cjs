const DDG = require('duck-duck-scrape');
const collect = require('collect.js');

async function search() {
  return await DDG.search('AData XPG SX6000 Pro PCIe M.2 Gen', {
    safeSearch: DDG.SafeSearchType.STRICT
  });
}

// DDG.stocks('aapl')
// DDG.currency('usd', 'eur', 1)
// DDG.dictionaryDefinition('happy')

search().then((searchResults) => {
  const titles = collect(searchResults.results.map(item => item.title));
});