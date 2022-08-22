const DDG = require('duck-duck-scrape');
const collect = require('collect.js');
const stringSimilarity = require("string-similarity");

async function search(str, { titles = false, similarityScore = false }) {
  const searches = await DDG.search(str, {
    safeSearch: DDG.SafeSearchType.STRICT
  });

  return titles ? similarityScore ? searches.results.map(i => { 
    return { title: i.title, score: stringSimilarity.compareTwoStrings(str, i.title) }; 
  }) : searches.results.map(i => i.title) : searches;
}

const str = 'AData XPG SX6000 Pro PCIe M.2 Gen';

searchWeb(str, {  }).then(resulsts => console.log(resulsts));

async function searchWeb(str, { titles = true, similarityScore = true, minScore = 0.5, showResults = 5 }) {
  const s = await search(str, { titles: titles, similarityScore: similarityScore });
  const results = collect(s)
    .filter(i => i.score > minScore)
    .sortBy((product, key) => product.score)
    .slice(-showResults)
    .reverse()
    .all();

  return results;
}